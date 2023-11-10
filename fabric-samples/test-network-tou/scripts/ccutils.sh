#!/bin/bash


# installChaincode PEER ORG
function installChaincode() {
  ORG=$1
	setGlobals $ORG $2
  setGlobalsCLI $ORG $2
  set -x
  peer lifecycle chaincode queryinstalled --output json | jq -r 'try (.installed_chaincodes[].package_id)' | grep ^${PACKAGE_ID}$ >&log.txt
  if test $? -ne 0; then
    peer lifecycle chaincode install ${CC_NAME}.tar.gz >&log.txt
    res=$?
  fi
  { set +x; } 2>/dev/null
  cat log.txt
  verifyResult $res "Chaincode installation on peer${2}.org${ORG} has failed"
  successln "Chaincode is installed on peer${2}.org${ORG}"
}

# queryInstalled PEER ORG
function queryInstalled() {
  ORG=$1
  PEER=$2
  setGlobals $ORG $PEER
  setGlobalsCLI $ORG $PEER
  set -x
  peer lifecycle chaincode queryinstalled --output json | jq -r 'try (.installed_chaincodes[].package_id)' | grep ^${PACKAGE_ID}$ >&log.txt
  res=$?
  { set +x; } 2>/dev/null
  cat log.txt
  verifyResult $res "Query installed on peer${PEER}.org${ORG} has failed"
  successln "Query installed successful on peer${PEER}.org${ORG} on channel"


  # 추가된 로그 코드
  echo "Querying installed chaincodes on peer${PEER}.org${ORG} to verify installation."
  echo "Expecting to find package ID: $PACKAGE_ID"
  installed=$(cat log.txt)
  echo $installed | grep $PACKAGE_ID && echo "Chaincode is correctly installed." || echo "Chaincode is NOT correctly installed."
}

# approveForMyOrg VERSION PEER ORG
function approveForMyOrg() {
  ORG=$1
  PEER=$2
  infoln "approveForMyOrg ORG :  ${ORG}"
  infoln "approveForMyOrg PEER :  ${PEER}"

  # 승인 정책이 "NA"가 아닌 경우 확인하고 로그에 기록
  if [ "$CC_END_POLICY" != "NA" ]; then
    infoln "Using endorsement policy: $CC_END_POLICY"
  else
    infoln "No endorsement policy provided, using default"
  fi

  setGlobals $ORG $PEER
  setGlobalsCLI $ORG $PEER
  infoln "policy : ${CC_END_POLICY}"
  set -x
  peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.tou.com --tls --cafile "$ORDERER_CA" --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --package-id ${PACKAGE_ID} --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG} >&log.txt
  res=$?
  { set +x; } 2>/dev/null
  cat log.txt
  verifyResult $res "Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
  successln "===Chaincode definition approved on peer0.org${ORG} on channel '$CHANNEL_NAME'==="
}

# checkCommitReadiness VERSION PEER ORG
function checkCommitReadiness() {
  ORG=$1
  PEER=$4
  infoln "checkCommitReadiness ORG :  ${ORG}"
  infoln "checkCommitReadiness PEER :  ${PEER}"

  setGlobals $ORG $PEER
  setGlobalsCLI $ORG $PEER
  shift 2
  infoln "Checking the commit readiness of the chaincode definition on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME'..."
  local rc=1
  local COUNTER=1
  # continue to poll
  # we either get a successful response, or reach MAX RETRY
  while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ]; do
    sleep $DELAY
    infoln "Attempting to check the commit readiness of the chaincode definition on peer${PEER}.org${ORG}, Retry after $DELAY seconds."
    set -x
    peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${CC_VERSION} --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG} --output json >&log.txt
    res=$?
    { set +x; } 2>/dev/null
    let rc=0
    for var in "$@"; do
      grep "$var" log.txt &>/dev/null || let rc=1
    done
    COUNTER=$(expr $COUNTER + 1)
  done
  cat log.txt
  if test $rc -eq 0; then
    infoln "Checking the commit readiness of the chaincode definition successful on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME'"
  else
    fatalln "After $MAX_RETRY attempts, Check commit readiness result on peer${PEER}.org${ORG} is INVALID!"
  fi

    # Log the final result of commit readiness check
  echo "Final commit readiness check result:" >> commitReadinessLog.txt
  cat log.txt >> commitReadinessLog.txt



  # 추가된 로그 코드
  echo "Checking commit readiness for chaincode name: $CC_NAME, version: $CC_VERSION, sequence: $CC_SEQUENCE..."
  readiness_response=$(cat log.txt)
  echo $readiness_response | jq
}

# commitChaincodeDefinition VERSION PEER ORG (PEER ORG)...
function commitChaincodeDefinition() {
  parsePeerConnectionParameters $@

  infoln "Committing with sequence number: $CC_SEQUENCE and package ID: $PACKAGE_ID"

  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "


  # while 'peer chaincode' command can get the orderer endpoint from the
  # peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  set -x
  peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.tou.com --tls --cafile "$ORDERER_CA" --channelID $CHANNEL_NAME --name ${CC_NAME} "${PEER_CONN_PARMS[@]}" --version ${CC_VERSION} --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG} >&log.txt
  res=$?
  { set +x; } 2>/dev/null
  cat log.txt
  verifyResult $res "Chaincode definition commit failed on peer0.org${ORG} on channel '$CHANNEL_NAME' failed"
  successln "Chaincode definition committed on channel '$CHANNEL_NAME'"
  # Log the final result of commit attempt
  echo "Final chaincode commit attempt result:" >> chaincodeCommitLog.txt
  cat log.txt >> chaincodeCommitLog.txt
}

# queryCommitted ORG
function queryCommitted() {
  ORG=$1
  PEER=$2
  setGlobals $ORG $PEER
  setGlobalsCLI $ORG $PEER
  EXPECTED_RESULT="Version: ${CC_VERSION}, Sequence: ${CC_SEQUENCE}, Endorsement Plugin: escc, Validation Plugin: vscc"
  infoln "Querying chaincode definition on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME'..."
  local rc=1
  local COUNTER=1
  # continue to poll
  # we either get a successful response, or reach MAX RETRY
  while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ]; do
    sleep $DELAY
    infoln "Attempting to Query committed status on peer0.org${ORG}, Retry after $DELAY seconds."
    set -x
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME} >&log.txt
    res=$?
    { set +x; } 2>/dev/null
    test $res -eq 0 && VALUE=$(cat log.txt | grep -o '^Version: '$CC_VERSION', Sequence: [0-9]*, Endorsement Plugin: escc, Validation Plugin: vscc')
    test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
    COUNTER=$(expr $COUNTER + 1)
  done
  cat log.txt
  if test $rc -eq 0; then
    successln "Query chaincode definition successful on peer0.org${ORG} on channel '$CHANNEL_NAME'"
  else
    fatalln "After $MAX_RETRY attempts, Query chaincode definition result on peer0.org${ORG} is INVALID!"
  fi


  # 체인코드 설치 확인 로그 추가
  println "Querying installed chaincodes on peer${PEER}.org${ORG} to verify installation."
  println "Expecting to find package ID: $PACKAGE_ID"
}

function chaincodeInvokeInit() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "

  # while 'peer chaincode' command can get the orderer endpoint from the
  # peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  set -x
  fcn_call='{"function":"'${CC_INIT_FCN}'","Args":[]}'
  infoln "invoke fcn call:${fcn_call}"
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.tou.com --tls --cafile "$ORDERER_CA" -C $CHANNEL_NAME -n ${CC_NAME} "${PEER_CONN_PARMS[@]}" --isInit -c ${fcn_call} >&log.txt
  res=$?
  { set +x; } 2>/dev/null
  cat log.txt
  verifyResult $res "Invoke execution on $PEERS failed "
  successln "Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME'"
}

function chaincodeQuery() {
  ORG=$1
  PEER=$2
  setGlobals $ORG $PEER
  setGlobalsCLI $ORG $PEER
  infoln "Querying on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME'..."
  local rc=1
  local COUNTER=1
  # continue to poll
  # we either get a successful response, or reach MAX RETRY
  while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ]; do
    sleep $DELAY
    infoln "Attempting to Query peer${PEER}.org${ORG}, Retry after $DELAY seconds."
    set -x
    peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["org.hyperledger.fabric:GetMetadata"]}' >&log.txt
    res=$?
    { set +x; } 2>/dev/null
    let rc=$res
    COUNTER=$(expr $COUNTER + 1)
  done
  cat log.txt
  if test $rc -eq 0; then
    successln "Query successful on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME'"
  else
    fatalln "After $MAX_RETRY attempts, Query result on peer${PEER}.org${ORG} is INVALID!"
  fi
}
#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/tou.com/tlsca/tlsca.tou.com-cert.pem
export PEER0_ORGPRODUCT_CA=${PWD}/organizations/peerOrganizations/orgProduct.tou.com/tlsca/tlsca.orgProduct.tou.com-cert.pem
export PEER0_ORGPROCESS_CA=${PWD}/organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem
#export PEER0_ORGPACKAGE_CA=${PWD}/organizations/peerOrganizations/orgPackage.tou.com/tlsca/tlsca.orgPackage.tou.com-cert.pem
#export PEER0_ORGSELL_CA=${PWD}/organizations/peerOrganizations/orgSell.tou.com/tlsca/tlsca.orgSell.tou.com-cert.pem
#export PEER1_ORGPRODUCT_CA=${PWD}/organizations/peerOrganizations/orgProduct.tou.com/tlsca/tlsca.orgProduct.tou.com-cert.pem
#export PEER1_ORGPROCESS_CA=${PWD}/organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem
#export PEER1_ORGPACKAGE_CA=${PWD}/organizations/peerOrganizations/orgPackage.tou.com/tlsca/tlsca.orgPackage.tou.com-cert.pem
#export PEER1_ORGSELL_CA=${PWD}/organizations/peerOrganizations/orgSell.tou.com/tlsca/tlsca.orgSell.tou.com-cert.pem

export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/organizations/ordererOrganizations/tou.com/orderers/orderer.tou.com/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/organizations/ordererOrganizations/tou.com/orderers/orderer.tou.com/tls/server.key

# Set environment variables for the peer org
# 피어 추가할 때 피어 번호별로 변수 추가 예정
setGlobals() {
  local USING_ORG=""
  local USING_PEER=$2

  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
#
#  if [ -z "$OVERRIDE_PEER" ]; then
#    USING_PEER=$2
#  else
#    USING_PEER="${OVERRIDE_PEER}"
#  fi


  infoln "Using organization ${USING_ORG}"
  infoln "Using PEER NO ${USING_PEER}"

  if [ $USING_ORG == 'Product' ] && [ $USING_PEER -eq 0 ]; then
    export CORE_PEER_LOCALMSPID="OrgProductMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORGPRODUCT_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgProduct.tou.com/users/Admin@orgProduct.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:3051
    export CORE_PEER_ADDRESS=peer0.orgProduct.tou.com:3051

  elif [ $USING_ORG == 'Product' ] && [ $USING_PEER -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="OrgProductMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORGPRODUCT_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgProduct.tou.com/users/Admin@orgProduct.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:4051
    export CORE_PEER_ADDRESS=peer1.orgProduct.tou.com:4051

  elif [ $USING_ORG == 'Process' ] && [ $USING_PEER -eq 0 ]; then
    export CORE_PEER_LOCALMSPID="OrgProcessMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORGPROCESS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgProcess.tou.com/users/Admin@orgProcess.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:5051

    export CORE_PEER_ADDRESS=peer0.orgProcess.tou.com:5051

  elif [ $USING_ORG == 'Process' ] && [ $USING_PEER -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="OrgProcessMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORGPROCESS_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgProcess.tou.com/users/Admin@orgProcess.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:6051

    export CORE_PEER_ADDRESS=peer1.orgProcess.tou.com:6051

  elif [ $USING_ORG == 'Package' ] && [ $USING_PEER -eq 0 ]; then
    export CORE_PEER_LOCALMSPID="OrgPackageMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORGPACKAGE_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgPackage.tou.com/users/Admin@orgPackage.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:7051
    export CORE_PEER_ADDRESS=peer0.orgPackage.tou.com:7051

  elif [ $USING_ORG == 'Package' ] && [ $USING_PEER -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="OrgPackageMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORGPACKAGE_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgPackage.tou.com/users/Admin@orgPackage.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:8051
    export CORE_PEER_ADDRESS=peer1.orgPackage.tou.com:8051

  elif [ $USING_ORG == 'Sell' ] && [ $USING_PEER -eq 0 ]; then
    export CORE_PEER_LOCALMSPID="OrgSellMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_SELL_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgSell.tou.com/users/Admin@orgSell.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:9051
    export CORE_PEER_ADDRESS=peer0.orgSell.tou.com:9051

  elif [ $USING_ORG == 'Sell' ] && [ $USING_PEER -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="OrgSellMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORGSELL_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgSell.tou.com/users/Admin@orgSell.tou.com/msp
#    export CORE_PEER_ADDRESS=localhost:10051
    export CORE_PEER_ADDRESS=peer1.orgSell.tou.com:10051


  else
    errorln "==========================ORG Unknown=========================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container
setGlobalsCLI() {
  infoln "Calling setGlobals in setGlobalsCLI"
  infoln "Variable 1 in setGlobalsCLI: $1"
  infoln "Variable 2 in setGlobalsCLI: $2"

  setGlobals $1 $2

  local USING_PEER=""
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi

  if [ -z "$OVERRIDE_PEER" ]; then
     USING_PEER=$2
  else
     USING_PEER="${OVERRIDE_PEER}"
  fi



  if [ $USING_ORG == 'Product' ] && [ $USING_PEER -eq 0 ]; then
#    export CORE_PEER_ADDRESS=peer0.orgProduct.tou.com:3051
    export CORE_PEER_ADDRESS=localhost:3051

  elif [ $USING_ORG == 'Product' ] && [ $USING_PEER -eq 1 ]; then
#    export CORE_PEER_ADDRESS=peer1.orgProduct.tou.com:4051
    export CORE_PEER_ADDRESS=localhost:4051

  elif [ $USING_ORG == 'Process' ] && [ $USING_PEER -eq 0 ]; then
#    export CORE_PEER_ADDRESS=peer0.orgProcess.tou.com:5051
    export CORE_PEER_ADDRESS=localhost:5051


  elif [ $USING_ORG == 'Process' ] && [ $USING_PEER -eq 1 ]; then
#    export CORE_PEER_ADDRESS=peer1.orgProcess.tou.com:6051
    export CORE_PEER_ADDRESS=localhost:6051


  elif [ $USING_ORG == 'Package' ] && [ $USING_PEER -eq 0 ]; then
#    export CORE_PEER_ADDRESS=peer0.orgPackage.tou.com:7051
    export CORE_PEER_ADDRESS=localhost:7051

  elif [ $USING_ORG == 'Package' ] && [ $USING_PEER -eq 1 ]; then
#    export CORE_PEER_ADDRESS=peer1.orgPackage.tou.com:8051
    export CORE_PEER_ADDRESS=localhost:8051

  elif [ $USING_ORG == 'Sell' ] && [ $USING_PEER -eq 0 ]; then
#    export CORE_PEER_ADDRESS=peer0.orgSell.tou.com:9051
    export CORE_PEER_ADDRESS=localhost:9051

  elif [ $USING_ORG == 'Sell' ] && [ $USING_PEER -eq 1 ]; then
#    export CORE_PEER_ADDRESS=peer1.orgSell.tou.com:10051
    export CORE_PEER_ADDRESS=localhost:10051


  else
    echo "================== ERROR !!! ORG Unknown =================="
  fi

}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=()
  PEERS=""
  while [ "$#" -gt 0 ]; do
    infoln "parsePeerConnectionParameters in envVar.sh"
    setGlobals $1 $2
    PEER="peer$2.org$1"
    ## Set peer addresses
    if [ -z "$PEERS" ]
    then
	PEERS="$PEER"
    else
	PEERS="$PEERS $PEER"
    fi
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" --peerAddresses $CORE_PEER_ADDRESS)
    ## Set path to TLS certificate
    CA=PEER${2}_ORG${1^^}_CA
    TLSINFO=(--tlsRootCertFiles "${!CA}")
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" "${TLSINFO[@]}")
    # shift by one to get to the next organization
    shift
  done
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}

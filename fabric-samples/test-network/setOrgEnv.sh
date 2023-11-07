#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0




# default to using Org1
ORG=${1:-Product}

# Exit on first error, print all commands.
set -e
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

ORDERER_CA=${DIR}/test-network/organizations/ordererOrganizations/tou.com/tlsca/tlsca.tou.com-cert.pem
PEER0_ORGPRODUCT_CA=${DIR}/test-network/organizations/peerOrganizations/orgProduct.tou.com/tlsca/tlsca.orgProduct.tou.com-cert.pem
PEER0_ORGPROCESS_CA=${DIR}/test-network/organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem
PEER0_ORGPACKAGE_CA=${DIR}/test-network/organizations/peerOrganizations/orgPackage.tou.com/tlsca/tlsca.orgPackage.tou.com-cert.pem
PEER0_SELL_CA=${DIR}/test-network/organizations/peerOrganizations/orgPackage.tou.com/tlsca/tlsca.orgPackage.tou.com-cert.pem
PEER1_ORGPRODUCT_CA=${DIR}/test-network/organizations/peerOrganizations/orgProduct.tou.com/tlsca/tlsca.orgProduct.tou.com-cert.pem
PEER1_ORGPROCESS_CA=${DIR}/test-network/organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem
PEER1_ORGPACKAGE_CA=${DIR}/test-network/organizations/peerOrganizations/orgPackage.tou.com/tlsca/tlsca.orgPackage.tou.com-cert.pem
PEER1_SELL_CA=${DIR}/test-network/organizations/peerOrganizations/orgPackage.tou.com/tlsca/tlsca.orgPackage.tou.com-cert.pem


if [[ ${ORG,,} == "product" || ${ORG,,} == "digibank" ]]; then

   CORE_PEER_LOCALMSPID=OrgProductMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/test-network/organizations/peerOrganizations/orgProduct.tou.com/users/Admin@orgProduct.tou.com/msp
   CORE_PEER_ADDRESS=localhost:3051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/test-network/organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem

elif [[ ${ORG,,} == "process" || ${ORG,,} == "magnetocorp" ]]; then

   CORE_PEER_LOCALMSPID=OrgProcessMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/test-network/organizations/peerOrganizations/orgProcess.tou.com/users/Admin@orgProcess.tou.com/msp
   CORE_PEER_ADDRESS=localhost:5051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/test-network/organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem

else
   echo "Unknown \"$ORG\", please choose Org1/Digibank or Org2/Magnetocorp"
   echo "For example to get the environment variables to set upa Org2 shell environment run:  ./setOrgEnv.sh Org2"
   echo
   echo "This can be automated to set them as well with:"
   echo
   echo 'export $(./setOrgEnv.sh Org2 | xargs)'
   exit 1
fi

# output the variables that need to be set
echo "CORE_PEER_TLS_ENABLED=true"
echo "ORDERER_CA=${ORDERER_CA}"
echo "PEER0_ORGPRODUCT_CA=${PEER0_ORGPRODUCT_CA}"
echo "PEER0_ORGPROCESS_CA=${PEER0_ORGPROCESS_CA}"
echo "PEER0_ORGPACKAGE_CA=${PEER0_ORGPACKAGE_CA}"
echo "PEER0_ORGSELL_CA=${PEER0_ORGSELL_CA}"
echo "PEER1_ORGPRODUCT_CA=${PEER0_ORGPRODUCT_CA}"
echo "PEER1_ORGPROCESS_CA=${PEER0_ORGPROCESS_CA}"
echo "PEER1_ORGPACKAGE_CA=${PEER0_ORGPACKAGE_CA}"
echo "PEER1_ORGSELL_CA=${PEER0_ORGSELL_CA}"

echo "CORE_PEER_MSPCONFIGPATH=${CORE_PEER_MSPCONFIGPATH}"
echo "CORE_PEER_ADDRESS=${CORE_PEER_ADDRESS}"
echo "CORE_PEER_TLS_ROOTCERT_FILE=${CORE_PEER_TLS_ROOTCERT_FILE}"

echo "CORE_PEER_LOCALMSPID=${CORE_PEER_LOCALMSPID}"

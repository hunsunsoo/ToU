#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=Product
P0PORT=3051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/orgProduct.tou.com/tlsca/tlsca.orgProduct.tou.com-cert.pem
CAPEM=organizations/peerOrganizations/orgProduct.tou.com/ca/ca.orgProduct.tou.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgProduct.tou.com/connection-orgProduct.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgProduct.tou.com/connection-orgProduct.yaml

ORG=Process
P0PORT=5051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/orgProcess.tou.com/tlsca/tlsca.orgProcess.tou.com-cert.pem
CAPEM=organizations/peerOrganizations/orgProcess.tou.com/ca/ca.orgProcess.tou.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgProcess.tou.com/connection-orgProcess.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgProcess.tou.com/connection-orgProcess.yaml

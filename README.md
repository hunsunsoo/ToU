# 🖥️ SSAFY 9기 자율 프로젝트 : 블록체인 기반 유통 과정 기록 및 추적 서비스

### 🕰️ 프로젝트 기간

#### 23.10.10 ~ 23.11.17(6주)

---

### 🧑‍🤝‍🧑 멤버 구성

| 팀원   | 역할                         |
| ------ | ---------------------------- |
| 황윤영 | 팀장, 블록체인, BE, Data적재 |
| 김동익 | BE                           |
| 김동현 | FE                           |
| 김정훈 | FE                           |
| 이수연 | FE                           |
| 정동교 | FE                           |

---

### 1️⃣ 기획 의도

| 원산지 표기에 대한 소비자 불신을 블록체인 도입으로 해결 |
| ------------------------------------------------------- |

| 생체인증 도입으로 전자거래 명세서 간소화 |
| ---------------------------------------- |

| 유통4.0 시대에 맞추어 유통 과정의 표준화 |
| ---------------------------------------- |

---

### 2️⃣ 서비스 소개

📌 **주요 기능 : 소비자 유통 조회**

- 생산, 가공, 패키징, 판매 단계의 유통 과정 조회
- 소비자의 GPS 위치와 판매지 위치의 거리를 측정하여 위·변조 가능성에 대한 경고 제공

📌 **주요 기능 : 생체인증 서명을 활용한 전자거래명세서 생성**

- Fido2 생체인증을 통한 서명으로 전자거래명세서 서명
- 전자거래 서명 절차의 간소화
- 서명 권한이 있는 담당자의 명확한 구분 가능
- 담당자의 블록체인에 저장된 정보의 신뢰성 보장

📌 **주요 기능 : 블록체인에 재고 기록**

- 상품이 공정과정을 거친 공장의 위치와 상품 정보, 일시를 기록
- 상품이 공정되는 데에 사용된 재료 재고의 번호를 기록하여 추적 구현

---

### 3️⃣ 아키텍처

![시스템아키텍처]()

---

### 4️⃣ 기술 스택

<div align=left>
<table>
    <tr>
        <td><b>Back-end</b></td>
        <td><img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"/>
<img src="https://img.shields.io/badge/JPA-59666C?style=flat-square&logo=Hibernate&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/fidoalliance-FFBF3B?style=flat-square&logo=fidoalliance&logoColor=white"/>
<img src="https://img.shields.io/badge/webauthn-3423A6?style=flat-square&logo=webauthn&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Redis-3.0.5-DC382D?style=flat-square&logo=Redis&logoColor=white"/>

</td>
    </tr>
    <tr>
    <td><b>Front-end</b></td>
    <td>
<img src="https://img.shields.io/badge/Npm-6.14.18-CB3837?style=flat-square&logo=Npm&logoColor=white"/>
<img src="https://img.shields.io/badge/Node-18.16.1-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white"/>
<img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-0.7.7-3578E5?style=flat-square&logo=recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/pwa-5A0FC8?style=flat-square&logo=pwa&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-F7DF1E?style=flat-square&logo=typescript&logoColor=black"/>
<br>

<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>

</td>
    </tr>
    <tr>
    <td><b>BlockChain</b></td>
    <td>
<img src="https://img.shields.io/badge/hyperledger-2F3134?style=flat-square&logo=hyperledger&logoColor=white"/>
<img src="https://img.shields.io/badge/docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/springboot-6DB33F?style=flat-square&logo=springboot&logoColor=white"/>
    </td>
    </tr>
    <tr>
    <td><b>Infra</b></td>
    <td>
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon aws&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-4479A1?style=flat-square&logo=Docker&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/NGINX-1.18.0(Ubuntu)-009639?style=flat-square&logo=NGINX&logoColor=white"/>
<img src="https://img.shields.io/badge/Jenkins-2.332.1-D24939?style=flat-square&logo=Jenkins&logoColor=white"/>
</td>
    <tr>
    <td><b>Tools</b></td>
    <td>
    <img src="https://img.shields.io/badge/Notion-333333?style=flat-square&logo=Notion&logoColor=white"/>
    <img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=white"/>
<img src="https://img.shields.io/badge/JIRA-0052CC?style=flat-square&logo=JIRA Software&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>
<img src="https://img.shields.io/badge/mattermost-0058CC?style=flat-square&logo=mattermost&logoColor=white"/>
    </td>
    </tr>
</table>
</div>

### 5️⃣ ERD

![ERD](etc/img/ERD.png)

---

### 6️⃣ API 명세

![API명세](etc/img/API명세서.png)

---

### 7️⃣ 서비스 화면


<h4>소비자화면</h4>

<img src="https://github.com/DongHyun-Klm/Algorithm/assets/120110806/fe87ba26-e480-4ebf-a95c-0097e2af7fcf" height="400px" width="200px"/>

- <b>수산물 유통 조회</b><br/>
    - 수산물의 생산, 가공, 패키징, 판매 단계의 유통 과정을 조회 할 수 있습니다.
</details>

<h4>모바일 화면</h4>

<img src="https://github.com/DongHyun-Klm/Algorithm/assets/120110806/fdd7de23-f232-4efd-b751-8c6f7359a183" height="400px" width="200px"/>

- <b>생체인증 로그인</b><br/>
    - 아이디와 비밀번호를 입력하는 대신 등록한 생체인증으로 로그인 할 수 있습니다.

<br/>

<table>
    <tr>
        <td> <img src="https://github.com/DongHyun-Klm/Algorithm/assets/120110806/fb8ab3f8-98fb-458a-be85-197410bca064" height="400px" width="200px"/> </td>
        <td> <img src="https://github.com/DongHyun-Klm/Algorithm/assets/120110806/9c408b4a-4678-4c77-95a8-6d3b5c4f8020" height="400px" width="200px"> </td>
        <td> <img src="https://github.com/DongHyun-Klm/Algorithm/assets/120110806/1eea3716-1464-439c-8195-e0dccfe28436" height="400px" width="200px"> </td>
    </tr>
</table>

- <b>거래명세서 생성</b><br/>
    - 거래명세서를 생성하고, 생체인증을 통해 서명할 수 있습니다.

<br/>

<img src="https://github.com/DongHyun-Klm/Algorithm/assets/120110806/946ef8a4-1eca-40f5-bcdd-756ccf904693" height="400px" width="200px"/>

- <b>거래명세서 내역조회</b><br/>
    - 거래가 완료된 거래명세서의 내역을 조회 할 수 있습니다.

<br/>

### 8️⃣ 프로젝트 폴더 구조

## BackEnd

```
📦back
 ┗ 📂tou
 ┃ ┣ 📂gradle
 ┃ ┃ ┗ 📂wrapper
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂generated
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂welcome
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tou
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂client
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂statement
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂stock
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂domain
 ┃ ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂welcome
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tou
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂client
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂consumer
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂statement
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂stock
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂webauthn
 ┃ ┃ ┃ ┗ 📂resources
 ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂welcome
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tou
```

## FrontEnd

```
📦front
 ┣ 📂public
 ┃ ┣ 📂companyLogo
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂icons
 ┃ ┣ 📂commons
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📂calendarStyle
 ┃ ┃ ┃ ┣ 📂mobileStyle
 ┃ ┃ ┃ ┗ 📂traderStyle
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┣ 📂atoms
 ┃ ┃ ┃ ┣ 📂officer
 ┃ ┃ ┃ ┣ 📂shopper
 ┃ ┃ ┃ ┗ 📂trader
 ┃ ┃ ┣ 📂molecules
 ┃ ┃ ┃ ┗ 📂trader
 ┃ ┃ ┗ 📂organisms
 ┃ ┃ ┃ ┣ 📂officer
 ┃ ┃ ┃ ┣ 📂shopper
 ┃ ┃ ┃ ┗ 📂trader
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂officer
 ┃ ┃ ┣ 📂shopper
 ┃ ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┣ 📂images
 ┃ ┃ ┣ 📂trader
 ┃ ┣ 📂store
 ┃ ┣ 📂types
```

## BlockChain
```
📦fabric-samples
 ┣ 📂asset-transfer-basic
 ┃ ┣ 📂application-gateway-java-tou
 ┃ ┃ ┣ 📂gradle
 ┃ ┃ ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📂src
 ┃ ┃ ┃ ┗ 📂main
 ┃ ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tou
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂utils
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂configuration
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂requestDto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┣ 📂chaincode-java-tou
 ┃ ┃ ┣ 📂docker
 ┃ ┃ ┣ 📂gradle
 ┃ ┃ ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📂src
 ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┃ ┗ 📂org
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂hyperledger
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂fabric
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂samples
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂assettransfer
 ┃ ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┃ ┗ 📂org
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂hyperledger
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂fabric
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂samples
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂assettransfer
 ┣ 📂test-network-tou
 ┃ ┣ 📂addOrg3
 ┃ ┃ ┣ 📂compose
 ┃ ┃ ┃ ┣ 📂docker
 ┃ ┃ ┃ ┃ ┣ 📂peercfg
 ┃ ┃ ┃ ┣ 📂podman
 ┃ ┃ ┃ ┃ ┣ 📂peercfg
 ┃ ┃ ┣ 📂fabric-ca
 ┃ ┃ ┃ ┣ 📂org3
 ┃ ┣ 📂compose
 ┃ ┃ ┣ 📂docker
 ┃ ┃ ┃ ┣ 📂peercfg
 ┃ ┃ ┣ 📂podman
 ┃ ┃ ┃ ┣ 📂peercfg
 ┃ ┣ 📂configtx
 ┃ ┣ 📂explorer
 ┃ ┃ ┣ 📂connection-profile
 ┃ ┃ ┣ 📂organizations
 ┃ ┃ ┃ ┣ 📂cryptogen
 ┃ ┃ ┃ ┣ 📂fabric-ca
 ┃ ┃ ┃ ┃ ┣ 📂ordererOrg
 ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂keystore
 ┃ ┃ ┃ ┃ ┣ 📂org1
 ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂keystore
 ┃ ┃ ┃ ┃ ┣ 📂org2
 ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂keystore
 ┃ ┃ ┃ ┣ 📂ordererOrganizations
 ┃ ┃ ┃ ┃ ┗ 📂example.com
 ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂orderers
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂orderer.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tls
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂tlsca
 ┃ ┃ ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂Admin@example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┣ 📂peerOrganizations
 ┃ ┃ ┃ ┃ ┣ 📂org1.example.com
 ┃ ┃ ┃ ┃ ┃ ┣ 📂ca
 ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂peers
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂peer0.org1.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tls
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂tlsca
 ┃ ┃ ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Admin@org1.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂User1@org1.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┗ 📂org2.example.com
 ┃ ┃ ┃ ┃ ┃ ┣ 📂ca
 ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂peers
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂peer0.org2.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂tls
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tlscacerts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂tlsca
 ┃ ┃ ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂Admin@org2.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂User1@org2.example.com
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂msp
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂cacerts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂keystore
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂signcerts
 ┃ ┣ 📂organizations
 ┃ ┃ ┣ 📂cryptogen
 ┃ ┃ ┣ 📂fabric-ca
 ┃ ┣ 📂scripts
 ┃ ┃ ┣ 📂org3-scripts
```

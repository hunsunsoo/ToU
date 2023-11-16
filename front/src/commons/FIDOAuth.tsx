import { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserInfoState, CompanyInfoState } from "../store/State";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/sharp-light-svg-icons";

const lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
let reverseLookup = new Uint8Array(256);

for (let i = 0; i < lookup.length; i++) {
    reverseLookup[lookup.charCodeAt(i)] = i;
}

function decodeBase64url(base64url: any) {
    const base64urlLength = base64url.length;

    const placeHolderLength = base64url.charAt(base64urlLength - 2) === "=" ? 2 : base64url.charAt(base64urlLength - 1) === "=" ? 1 : 0;
    const bufferLength = (base64urlLength * 3) / 4 - placeHolderLength;

    let arrayBuffer = new ArrayBuffer(bufferLength);
    let uint8Array = new Uint8Array(arrayBuffer);

    let j = 0;
    for (let i = 0; i < base64urlLength; i += 4) {
        let tmp0 = reverseLookup[base64url.charCodeAt(i)];
        let tmp1 = reverseLookup[base64url.charCodeAt(i + 1)];
        let tmp2 = reverseLookup[base64url.charCodeAt(i + 2)];
        let tmp3 = reverseLookup[base64url.charCodeAt(i + 3)];

        uint8Array[j++] = (tmp0 << 2) | (tmp1 >> 4);
        uint8Array[j++] = ((tmp1 & 15) << 4) | (tmp2 >> 2);
        uint8Array[j++] = ((tmp2 & 3) << 6) | (tmp3 & 63);
    }

    return arrayBuffer;
}

interface FIDOAuthProps {
  isWeb: boolean;
}


const FIDOAuth: React.FC<FIDOAuthProps> = ({ isWeb }) => {
  const navigate = useNavigate();
  const LOCALHOST = "http://localhost:8080/api/";
  const SERVER_TOU = "https://k9b310.p.ssafy.io/api/";

  const userInfo = useRecoilValue(UserInfoState);
  const accessToken = userInfo.accessToken;
  const setUserInfo = useSetRecoilState(UserInfoState);
  const setCompanyInfo = useSetRecoilState(CompanyInfoState);

  const [userHandle, setUserHandle] = useState("");
  const [username, setUsername] = useState("");
  const [webAuthnChallenge, setWebAuthnChallenge] = useState("");
  const [webAuthnCredentialIds, setWebAuthnCredentialIds] = useState([]);




  const WebAuthnFido2Login = async () => {
    try {
      const optionsResponse = await axios.post(SERVER_TOU + "webauthn/assertion/options");
      const { rpId, challenge, extensions, timeout } = await optionsResponse.data;
  
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: decodeBase64url(challenge),
          rpId,
          timeout,
          userVerification: "preferred",
          extensions,
        },
      });
  
      if (credential) {
        const fidoLoginResponse = await axios.post(SERVER_TOU + "client/pass-login", {
          passId: credential.id,
        });
  
        setUserInfo(() => ({
          accessToken: fidoLoginResponse.data.data.accessToken,
          workerSeq: fidoLoginResponse.data.data.worker.workerSeq,
          workerName: fidoLoginResponse.data.data.worker.workerName,
          workerRole: fidoLoginResponse.data.data.worker.role,
          branchSeq: fidoLoginResponse.data.data.branch.branchSeq,
          branchName: fidoLoginResponse.data.data.branch.branchName,
          branchType: fidoLoginResponse.data.data.branch.branchType,
          companySeq: fidoLoginResponse.data.data.company.companySeq,
          companyName: fidoLoginResponse.data.data.company.companyName,
        }));
  
        setCompanyInfo(() => ({
          companySeq: fidoLoginResponse.data.data.company.companySeq,
          companyName: fidoLoginResponse.data.data.company.companyName,
          registrationNumber: fidoLoginResponse.data.data.company.registrationNumber,
          companyLocation: fidoLoginResponse.data.data.company.companyLocation,
          companyContact: fidoLoginResponse.data.data.company.companyContact,
          logoImage: fidoLoginResponse.data.data.company.logoImage,
        }));

        if(!isWeb){
          setTimeout(() => navigate("/m"), 800); 
        }
      } else {
        console.error("Credential is undefined");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
        <Toaster />
        {isWeb ? 
          <StyledButton onClick={WebAuthnFido2Login}>
            <Icon icon={faFingerprint} />
            PASSKEY
          </StyledButton>
        : 
          <StyledButtonMobile onClick={WebAuthnFido2Login}>
            <Icon2 icon={faFingerprint} />
            PASSKEY 로그인
          </StyledButtonMobile>
        }
    </>
  );      
}
export default FIDOAuth;

  const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #404DCD;
    border-radius: 15px;
    color: white;
    padding: 10px;
    margin-top: 10px;
    border: none;
    width: 150px;
    height: 40px;
    font-size: 20px;
    left: 5px;
    cursor: pointer;
  `

  const Button = styled.button`
    background-color: #3a89ff;
    border: none;
    width: 80%;
    height: 3rem;
    margin: 1rem 0;
    border-radius: 100px;
    color: #fff;
    font-size: 1.5rem;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); // 그림자 추가
  `;

  const StyledButtonMobile = styled(Button)`
    background-color: #fff; // 배경색 변경
    color: #3a89ff; // 텍스트 색상 변경
    border: 1px solid #3a89ff; // 테두리 추가
    display: flex; // 버튼 내부 요소를 flexbox로 배치
    justify-content: center; // 요소들을 가로축 중앙에 정렬
    align-items: center; // 요소들을 세로축 중앙에 정렬
    width: 80%;
    cursor: pointer;
  `

  // FontAwesome 아이콘 컴포넌트에 스타일을 추가
  const Icon = styled(FontAwesomeIcon)`
    margin-right: 0.5rem; // 아이콘과 텍스트 사이의 간격
    color: white; // 아이콘 색상 설정
  `;

  const Icon2 = styled(FontAwesomeIcon)`
    margin-right: 0.5rem; // 아이콘과 텍스트 사이의 간격
    color: #3a89ff; // 아이콘 색상 설정
  `;
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserInfoState, CompanyInfoState } from "../store/State";

const lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
let reverseLookup = new Uint8Array(256);

for (let i = 0; i < lookup.length; i++) {
    reverseLookup[lookup.charCodeAt(i)] = i;
}

function decodeBase64url(base64url) {
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

function encodeBase64url(arrayBuffer) {
    let uint8Array = new Uint8Array(arrayBuffer);
    const length = uint8Array.length;
    let base64url = "";

    for (let i = 0; i < length; i += 3) {
        base64url += lookup[uint8Array[i] >> 2];
        base64url += lookup[((uint8Array[i] & 3) << 4) | (uint8Array[i + 1] >> 4)];
        base64url += lookup[((uint8Array[i + 1] & 15) << 2) | (uint8Array[i + 2] >> 6)];
        base64url += lookup[uint8Array[i + 2] & 63];
    }

    switch (length % 3) {
        case 1:
            base64url = base64url.substring(0, base64url.length - 2);
            break;
        case 2:
            base64url = base64url.substring(0, base64url.length - 1);
            break;
    }
    return base64url;
}


const FIDOAuth = () => {
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
    const optionsResponse = await axios.post(SERVER_TOU + "webauthn/assertion/options")
    const { rpId, challenge, extensions, timeout } = await optionsResponse.data;
    console.log(optionsResponse);

    const credential = await navigator.credentials.get({
      publicKey: {
        challenge: decodeBase64url(challenge),
        rpId,
        timeout,
        userVerification: "preferred",
        extensions,
      },
    });
    console.log(credential)
    
    const fidoLoginResponse = await axios.post(SERVER_TOU + "client/pass-login",{
        passId : credential.id
    })

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

    if(credential) {
        toast.success("Passkey 서명 완료", {
            duration: 2000,
        });
        setTimeout(() => {
        }, 2000);
    }
  }

  const buttonStyle = {
    backgroundColor: '#404DCD',
    color: 'white',
    padding: '10px',
    margin: '10px',
    border: 'none',
  }
  return (
    <div>
        <Toaster />
        <button onClick={WebAuthnFido2Login} style={buttonStyle}>PASSKEY 로그인</button>
    </div>
  );
      
}
export default FIDOAuth;
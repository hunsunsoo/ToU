import { useState, useEffect } from "react";
import axios from "axios";
// import { decodeBase64url, encodeBase64url } from "./base64url.js"

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


const Fido = () => {

  const [userHandle, setUserHandle] = useState("");
  const [username, setUsername] = useState("");

  const storedValue = localStorage.getItem("recoil-persist");
  const accessToken = storedValue ? JSON.parse(storedValue)?.UserInfoState?.accessToken : undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://k9b310.p.ssafy.io:8080/webauthn/user-handle", {
          headers: {
            AUTHORIZATION: 'Bearer ' + `${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data);
        setUserHandle(response.data.data.userHandle);
        setUsername(response.data.data.username);
      } catch (error) {
        console.error("오류입니다", error);
      }
    };

    fetchData();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨을 의미합니다.


  const zzz = () => {
    axios.post("https://tou.kr/api/webauthn/attestation/options")
    .then((response)=>{
      console.log(response)
      const options = response.data;
      let ccOptions = {
        ...options,
        challenge: decodeBase64url(options.challenge),
        user: {
            id: decodeBase64url(userHandle),
            name: username,
            displayName: username,
        },
        excludeCredentials: options.excludeCredentials.map((credential) => ({
            ...credential,
            id: decodeBase64url(credential.id),
        })),
        authenticatorSelection: {
            requireResidentKey: true,
            userVerification: "discouraged",
        },
      };

      const credential = navigator.credentials.create({
        publicKey: ccOptions,
      })
      console.log("Created credential: ", credential);
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  return (
    <div>
      <button onClick={zzz}> 등록</button>
    </div>
  );
      
}
export default Fido;
import axios from "axios";
import { customAxios } from "../components/api/customAxios";

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

const FIDOSign = async () => {
    const SERVER_TOU = "https://k9b310.p.ssafy.io/api/";

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
    
    const fidoLoginResponse = await customAxios.post("/client/pass-auth",{
        passId : credential.id
    })

    console.log(fidoLoginResponse)
    if(fidoLoginResponse) {
        if(fidoLoginResponse.data.data == 'AUTHENTICATED'){
            return true;
        }
        else {
            return false;
        }
    }

}
export default FIDOSign;
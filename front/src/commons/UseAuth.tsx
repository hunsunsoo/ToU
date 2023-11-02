import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAxios } from "../components/api/customAxios";
import {
  UserInfoState,
} from "../store/State";
import { useState, useEffect } from 'react';

export function UseAuth() {
  const userInfo = useRecoilValue(UserInfoState);
  const accessToken = userInfo.accessToken;
  const setUserInfo = useSetRecoilState(UserInfoState);

  // console.log("accessToken: ", accessToken)

  useEffect(() => {
    // console.log("accessToken(UseEffect진입): ", accessToken)
    async function checkAuthentication() {
      // console.log("accessToken(checkAuthentication): ", accessToken)
        if (!accessToken) { //atk없으면
          // setIsAuthenticated(false);
          return;
        }
        
  }
  checkAuthentication();
}, [accessToken, setUserInfo]);

const login = async (id: string, password: string) => {
  const body = {
    loginId: id,
    password: password,
  }
  authAxios.post("/client/login", body)
    .then((res) => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        accessToken: res.data.data.accessToken,
      }));
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};
  
return { login };
}


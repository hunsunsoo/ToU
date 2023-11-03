import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAxios } from "../components/api/customAxios";
import {
  UserInfoState,
} from "../store/State";
import { useEffect } from 'react';

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
  try {
    const body = {
      loginId: id,
      password: password,
    };

    const res = await authAxios.post("/client/login", body);
    
    setUserInfo(() => ({
      accessToken: res.data.data.accessToken,
      workerSeq: res.data.data.worker.workerSeq,
      workerName: res.data.data.worker.workerName,
      workerRole: res.data.data.worker.role,
      selectedBranch: res.data.data.branches[0], // 여기서는 첫 번째 branch를 선택
      branchList: res.data.data.branches,
      companySeq: res.data.data.company.companySeq,
      companyName: res.data.data.company.companyName,
    }));

  } catch (error) {
    console.log(error);
  }
};
  
return { login };
}


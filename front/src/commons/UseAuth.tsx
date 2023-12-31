import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAxios } from "../components/api/customAxios";
import { UserInfoState, CompanyInfoState } from "../store/State";
import { useEffect } from "react";

export function UseAuth() {
  const userInfo = useRecoilValue(UserInfoState);
  const accessToken = userInfo.accessToken;
  const setUserInfo = useSetRecoilState(UserInfoState);
  const setCompanyInfo = useSetRecoilState(CompanyInfoState);

  useEffect(() => {
    async function checkAuthentication() {
      if (!accessToken) {
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
        workerName: res.data.data.worker.workerName,
        workerRole: res.data.data.worker.role,
        branchSeq: res.data.data.branch.branchSeq,
        branchName: res.data.data.branch.branchName,
        branchType: res.data.data.branch.branchType,
        companySeq: res.data.data.company.companySeq,
        companyName: res.data.data.company.companyName,
      }));

      setCompanyInfo(() => ({
        companySeq: res.data.data.company.companySeq,
        companyName: res.data.data.company.companyName,
        registrationNumber: res.data.data.company.registrationNumber,
        companyLocation: res.data.data.company.companyLocation,
        companyContact: res.data.data.company.companyContact,
        logoImage: res.data.data.company.logoImage,
      }));

      return res;
    } catch (error) {
    }
  };

  return { login };
}

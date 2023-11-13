import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  UserInfoState
} from "../../../store/State";
import { ROUTES } from "../../../commons/Routes";
import Fido from "../../../commons/Fido";

const OfficerSideBar = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(UserInfoState);
  const setUserInfo = useSetRecoilState(UserInfoState);

  
  const handleDropdownChange = (selectedValue: string) => {
    const intValue = parseInt(selectedValue, 10);
    console.log(intValue);
    // setUserInfo((prevUserInfo: UserInfo) => ({
    //   ...prevUserInfo,
    //   selectedBranch: prevUserInfo.branchList.find(
    //     (branch: BranchInfo) => branch.branchSeq === intValue
    //   ),
    // }));
  };

  return (
  <SidebarContainer>
    {/* 이미지는 아직 안했음 */}
    <RoundImage src="/emart.png" alt="Emart Logo" />
    <CompInfo>
      <p>{userInfo.companyName}</p>
      <p>{userInfo.branchName}</p>
    </CompInfo>
    <p>{userInfo.workerName}</p>
    <Line />
    <ListBtn onClick={() => navigate(ROUTES.OFFICER_MAIN)}>메인페이지</ListBtn>
    <ListBtn onClick={() => navigate(ROUTES.OFFICER_CREATE)}>거래명세서 생성</ListBtn>
    <ListBtn onClick={() => navigate(ROUTES.OFFICER_MANAGE)}>거래명세서 관리</ListBtn>
    <ListBtn onClick={() => navigate(ROUTES.OFFICER_STOCK)}>공정/재고 관리</ListBtn>
    <ListBtn onClick={() => navigate(ROUTES.OFFICER_NOTICE)}>공지사항 및 문의</ListBtn>
    <ListBtn>개인정보 수정</ListBtn>
    <Fido />
  </SidebarContainer>
  )
}

export default OfficerSideBar


const SidebarContainer = styled.div`
  text-align: center;
  padding: 10px;
  background-color: #545A96;
  color: white;
`;

const RoundImage = styled.img`
  object-fit: cover;
  width: 170px;
  height: 170px;
  border-radius: 50%;
`;

const CompInfo = styled.div`
  display: block;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const Dropdown = styled.select`
  /* width: 100%; */
  padding: 4px;
  position: relative;
  left: 10px;
  font-size: 13px;
`

const Line = styled.div`
  height: 0px;
  border: 1px solid white;
  margin-bottom: 20px;
`

const ListBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  margin: 10px;
  cursor: pointer;
`
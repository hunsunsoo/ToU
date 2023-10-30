import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import OfficerBtn from "../../atoms/officer/OfficerBtn";
import { ROUTES } from "../../../commons/Routes";

const OfficerSideBar = () => {
  const navigate = useNavigate();
  
  const handleDropdownChange = (selectedValue: string) => {
    const intValue = parseInt(selectedValue, 10);
    // 나중에 이 int값을 seq넘버로 쓰면 됨
    console.log(intValue);
  };

  return (
  <SidebarContainer>
    <RoundImage src="/emart.png" alt="Emart Logo" />
    <CompInfo>
      업체명
      {/* 드롭다운 메뉴 */}
      <Dropdown onChange={(e) => handleDropdownChange(e.target.value)}>
        <option value="1">부산공장</option>
        <option value="2">창원공장</option>
        <option value="3">포항공장</option>
      </Dropdown>
    </CompInfo>
    <p>로그인 한 사용자 이름</p>
    <Line />
    <ListBtn onClick={() => navigate("/")}>메인페이지</ListBtn>
    <ListBtn onClick={() => navigate("/create")}>거래명세서 생성</ListBtn>
    <ListBtn onClick={() => navigate("/manage")}>거래명세서 관리</ListBtn>
    <ListBtn onClick={() => navigate("/stock")}>공정/재고 관리</ListBtn>
    <ListBtn onClick={() => navigate("/notice")}>공지사항 및 문의</ListBtn>
    <ListBtn>개인정보 수정</ListBtn>
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const Dropdown = styled.select`
  /* width: 100%; */
  padding: 8px;
  position: relative;
  left: 30px;
  font-size: 16px;
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
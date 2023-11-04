import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInputDiv from "../../components/organisms/officer/OfficerInputDiv";
import OfficerItemTable from "../../components/atoms/officer/OfficerItemTable";
import Modal from "../../components/atoms/officer/OfficerItemModal";
import { customAxios } from '../../components/api/customAxios';

interface Company {
  companySeq: number;
  companyName: string;
}

const OfficerCreatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 업체 목록 조회
  const [companys, setCompanys] = useState<Company[]>([]);
  // 선택 업체 이름
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");

  // 업체 선택 함수
  const selectCompany = (company: Company) => {
    setSelectedCompanyName(company.companyName);
    closeModal();
  }

  useEffect(() => {
    // 업체 목록 조회 API
    customAxios('/client/worker/company/list')
      .then((res) => {
        // console.log(res.data.data.companyList);
        setCompanys(res.data.data.companyList);
      })
  }, []);  

  // 모달 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 조회 버튼 클릭
  const getCompanyList = () => {
    openModal();
  }

  const onClick = () => {

  }

  const handleDropdownChange = (selectedValue: string) => {
    const intValue = parseInt(selectedValue, 10);
    // 나중에 이 int값을 seq넘버로 쓰면 됨
    console.log(intValue);
  };

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          거래명세서 생성
        </OfficerTitle>
        <Line/>
        <StyledP>
          • 인수자 등록
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={getCompanyList}>
            조회
          </OfficerBtn> 
        </StyledP>
        <OfficerInputDiv selectedCompanyName={selectedCompanyName} isStockManage={false}/>
        <StyledP>
          • 거래 일자 등록
          "캘린더 선택 들어갈 자리"
        </StyledP>
        <p></p>
        <StyledP>
          • 품목 등록
        </StyledP>
        <OfficerItemTable />
        <BtnDiv>
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={onClick}>
            생성
          </OfficerBtn>
        </BtnDiv>
      </ContentDiv>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div>
          <h2>업체 조회</h2>
          {/* 모달 내용 추가 */}
          <StyledTable>
            <tbody>
              {companys.map((company, index) => (
                <tr key={index} onClick={() => selectCompany(company)}>
                  <td>{company.companyName}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </Modal>
    </MainDiv>
  )
}

export default OfficerCreatePage

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: calc(100vh - 40px);
  overflow: hidden;
`

const ContentDiv = styled.div`
  padding: 20px;
  font-size: 17px;
  font-weight: bold;
  color: #545A96;
`

const Line = styled.div`
  height: 0px;
  border: 1px solid #666;
  margin-bottom: 20px;
`

const StyledP = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 17px;
`

const Dropdown = styled.select`
  /* width: 100%; */
  padding: 8px;
  position: relative;
  left: 30px;
  font-size: 16px;
`

const BtnDiv = styled.div`
  margin-top: 20px;
  margin-left: 90%;
`

const StyledTable = styled.table`
  margin: 10px 0;
  width: 100%;
  border-collapse: collapse;
  color: #545A96;

  td {
    padding: 6px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
`;
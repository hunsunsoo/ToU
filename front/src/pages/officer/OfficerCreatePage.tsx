import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInputDiv from "../../components/organisms/officer/OfficerInputDiv";
import OfficerItemTable from "../../components/atoms/officer/OfficerItemTable";
import Modal from "../../components/atoms/officer/OfficerItemModal";
import { customAxios } from '../../components/api/customAxios';
import OfficerCreateCalendar from '../../components/atoms/officer/OfficerCreateCalendar';
import toast, { Toaster } from 'react-hot-toast';


interface Company {
  companySeq: number;
  companyName: string;
}

interface Branch {
  branchSeq: number;
  branchName: string;
}

const OfficerCreatePage = () => {
  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // company 목록 조회
  const [companys, setCompanys] = useState<Company[]>([]);
  // 선택 company 정보
  const [selectedCompanySeq, setSelectedCompanySeq] = useState<number>();
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  // 선택 company의 branch 목록 조회
  const [branchs, setBranchs] = useState<Branch[]>([]);


  // 업체 선택 함수
  const selectCompany = (company: Company) => {
    setSelectedCompanyName(company.companyName);
    setSelectedCompanySeq(company.companySeq);
    
    closeModal();
  }

  useEffect(() => {
    // branch 목록 조회 API
    if (selectedCompanySeq) {
      customAxios(`client/worker/branch/list/${selectedCompanySeq}`)
        .then((res) => {
          console.log(res.data.data.branchList);
          setBranchs(res.data.data.branchList);
        })
    }
  }, [selectedCompanySeq])

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const awaitToken = async () => {
      return new Promise((resolve) => {
        const checkToken = () => {
          const storedValue = localStorage.getItem("recoil-persist");
          const accessToken = storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;
          
          if (accessToken) {
            resolve(accessToken);
          } else {
            setTimeout(checkToken, 1000); // 1초마다 토큰 체크
          }
        };
        checkToken();
      });
    };

    // company 목록 조회 API
    customAxios('/client/worker/company/list')
      .then((res) => {
        // console.log(res.data.data.companyList);
        setCompanys(res.data.data.companyList);
      })
  }, []);

  // branch 선택
  const [selectedBranchSeq, setSelectedBranchSeq] = useState<number | null>(null);

  const handleBranchSelection = (branchSeq: number) => {
    setSelectedBranchSeq(branchSeq);
  };
  
  // 날짜 선택
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
    );
    
  const handleDateChange = (date: Date | Date[] | null) => {
    setSelectedDate(date);
  };

  // 선택한 물품 seq 리스트
  const [selectedSeqList, setSelectedSeqList] = useState<number[]>([]);

  // 명세서 생성
  const handleStatementCreate = () => {
    const body = {
      responseBranch:selectedBranchSeq,
      tradeDate: selectedDate,
      items: selectedSeqList,
    }
    
    customAxios.post(`statement/worker`, body)
      .then((res) => {
        console.log(res);
        if(res.status === 200) {
          toast.success("거래명세서 생성을 성공했습니다.", {
            duration: 1000,
          });
          setTimeout(() => {
          }, 1000);
        } else {
          toast.error("요청이 실패했습니다.", {
            duration: 1000,
          });
          setTimeout(() => {
          }, 1000);
        }
      })
      .catch((res) => {
        console.log(res);
        toast.error("서버 에러", {
          duration: 1000,
        });
        setTimeout(() => {
        }, 1000);
      })
  }

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <div><Toaster /></div>
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
        <OfficerInputDiv 
          selectedCompanyName={selectedCompanyName} 
          branchs={branchs} 
          isStockManage={false}
          branchSelectionCallback={handleBranchSelection}
        />
        <StyledP>
          • 거래 일자 등록
          <OfficerCreateCalendar  onChange={handleDateChange} value={selectedDate}/>
        </StyledP>
        <p></p>
        <StyledP>
          • 품목 등록
        </StyledP>
        <OfficerItemTable onSelectedSeqListChange={setSelectedSeqList} />
        <BtnDiv>
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={handleStatementCreate}>
            생성
          </OfficerBtn>
        </BtnDiv>
      </ContentDiv>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType={"type1"}
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType={"type2"}
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
import { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { UserInfoState } from "../../store/State";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInput from '../../components/atoms/officer/OfficerInput';
import OfficerDocTable from "../../components/atoms/officer/OfficerDocTable";
import OfficerStockCalendar from '../../components/atoms/officer/OfficerStockCalendar';
import html2pdf from 'html2pdf.js';

interface paramConfig {
  page: number;
  type: "req" | "res";
  companyName?: string;
  isMine: boolean;
  myWorkerName?: string;
  otherWorkerName?: string;
  productName?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

const OfficerManagePage = () => {
  const userInfo = useRecoilValue(UserInfoState);

  const [isSupply, setIsSupply] = useState(true);
  const [params, setParams] = useState<paramConfig>({
    page: 1,
    type: "req",
    isMine: false,
  });

  const [searchParams, setSearchParams] = useState<paramConfig>({
    page: 1,
    type: isSupply ? "req" : "res",
    isMine: false,
  });

  const resetParams: paramConfig = ({
    page: 1,
    type: isSupply ? "req" : "res",
    isMine: false,
  });
  
  // 공급, 수급 변경
  const handleIsSupply = () => {
    setIsSupply((prevIsSupply) => !prevIsSupply);

    if (isSupply) {
      setParams((prevParams) => ({ ...prevParams, type: "res" }));
      setSearchParams((prevParams) => ({ ...prevParams, type: "res" }));
    } else {
      setParams((prevParams) => ({ ...prevParams, type: "req" }));
      setSearchParams((prevParams) => ({ ...prevParams, type: "req" }));
    }
  }
  
  // 회사명 검색
  const handleCompanyName = (value: string) => {
    setSearchParams((prevParams) => ({ ...prevParams, companyName: value }));
  };

  // 본사 담당자명 검색
  const handleMyWorkerName = (value: string) => {
    setSearchParams((prevParams) => ({ ...prevParams, myWorkerName: value }));
  };

  // 거래처 담당자명 검색
  const handleOtherWorkerName = (value: string) => {
    setSearchParams((prevParams) => ({ ...prevParams, otherWorkerName: value }));
  };

  // 거래처 담당자명 검색
  const handleProductName = (value: string) => {
    setSearchParams((prevParams) => ({ ...prevParams, productName: value }));
  };

  // 거래 상태 드롭다운 검색
  const handleDropdownChange = (selectedValue: string) => {
    let unit: string;

    switch (selectedValue) {
      case "1":
        unit = "PREPARING";
        break;
      case "2":
        unit = "WAITING";
        break;
      case "3":
        unit = "COMPLETION";
        break;
      case "4":
        unit = "REFUSAL";
        break;
      case "5":
        unit = "DELETE";
        break;
      default:
        unit = "";
    }
    setSearchParams((prevParams) => ({ ...prevParams, status: unit }));
  };

  // 시작일 선택
  const [selectedStartDate, setSelectedStartDate] = useState<Date | Date[] | null>(
    new Date()
  );
    
  // 시작일 변경
  const handleStartDateChange = (date: Date | Date[] | null) => {
    if (date instanceof Date) {
      const dateString = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2 ').split(' ')[0];
      setSelectedStartDate(date);
      setSearchParams((prevParams) => ({ ...prevParams, startDate: dateString }));
    }
  };

  // 마감일 선택
  const [selectedEndDate, setSelectedEndDate] = useState<Date | Date[] | null>(
    new Date()
  );
    
  // 마감일 변경
  const handleEndDateChange = (date: Date | Date[] | null) => {
    if (date instanceof Date) {
      const dateString = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2 ').split(' ')[0];
      setSelectedEndDate(date);
      setSearchParams((prevParams) => ({ ...prevParams, endDate: dateString }));
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // return `${year}-${month}-${day}`;
  };

  // 조회 버튼 클릭
  const searchBtnClick = () => {
    setParams(searchParams);
  }

  // 초기화 버튼 클릭
  const searchBtnReset = () => {
    setParams(resetParams);
  }

  // pdf 저장 로직
  const contentRef = useRef<HTMLDivElement | null>(null);
  const handleGeneratePdf = () => {
    const content = contentRef.current;

    if (content) {
      const set = {
        margin: 10, // 여백을 원하는 값으로 조정
        filename: 'certificate.pdf',
      }
      //@ts-ignore
      html2pdf(content, set);
    }
  };

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          거래명세서 관리
          {isSupply ? (
            <TagBtnDiv onClick={handleIsSupply}>
              <TagActiveBtn>납품</TagActiveBtn>
              <TagInActiveBtn>발주</TagInActiveBtn>
            </TagBtnDiv>
          ) : (
            <TagBtnDiv onClick={handleIsSupply}>
              <TagInActiveBtn>납품</TagInActiveBtn>
              <TagActiveBtn>발주</TagActiveBtn>
            </TagBtnDiv>
          )}
        </OfficerTitle>

        <Line/>
        
        <StyledDiv>
          <StyledP>
            <StyledSpan>• 업체명</StyledSpan>
            <OfficerInput 
              size={"underwriter"}
              value={params.companyName}
              onChange={(e) => handleCompanyName(e.target.value)}
            />
          </StyledP>
          <StyledP>
            <StyledSpan>• 거래 상태</StyledSpan>
            <Dropdown onChange={(e) => handleDropdownChange(e.target.value)}>
              <option value="1">거래준비중</option>
              <option value="2">서명대기중</option>
              <option value="3">완료</option>
              <option value="4">거절</option>
              <option value="5">삭제</option>
            </Dropdown>
          </StyledP>
        </StyledDiv>
        <StyledDiv>
          <StyledP>
            {isSupply ? (
              <>
                <StyledSpan>• 본사 담당자</StyledSpan>
                <OfficerInput 
                  size={"underwriter"}
                  value={params.myWorkerName}
                  onChange={(e) => handleMyWorkerName(e.target.value)}
                />
              </>
            ) : (
              <>
                <StyledSpan>• 거래처 담당자</StyledSpan>
                <OfficerInput 
                  size={"underwriter"}
                  value={params.otherWorkerName}
                  onChange={(e) => handleOtherWorkerName(e.target.value)}
                />
              </>
            )}
          </StyledP>
          <StyledP>
            <StyledSpan>• 품목명</StyledSpan>
            <OfficerInput 
                  size={"underwriter"}
                  value={params.productName}
                  onChange={(e) => handleProductName(e.target.value)}
                />
          </StyledP>
        </StyledDiv>
        <StyledDiv>
          <StyledP>
            <StyledSpan>• 거래 일시</StyledSpan>
            <OfficerStockCalendar onChange={handleStartDateChange} value={selectedStartDate}/>
            ~
            <OfficerStockCalendar onChange={handleEndDateChange} value={selectedEndDate}/>
          </StyledP>

          <StyledBtn>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={searchBtnClick}>
              조회
            </OfficerBtn>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={false}
              onClick={searchBtnReset}>
              초기화
            </OfficerBtn> 
          </StyledBtn>
        </StyledDiv>
        <div ref={contentRef}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>{userInfo.companyName} {userInfo.branchName}</div>
            <div>{getCurrentTime()}</div>
          </div>
          <OfficerDocTable isSupply={ isSupply } params={params} setParams={setParams}/>
        </div>

        <Line/>

        <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={handleGeneratePdf}>
            PDF 출력
          </OfficerBtn>
      </ContentDiv>
    </MainDiv>
  )
}

export default OfficerManagePage

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

const TagBtnDiv = styled.div`
  
`

const TagActiveBtn = styled.button`
  margin: 0 10px;
  width: 80px;
  height: 35px;
  background-color: #404DCD;
  border: 0;
  color: white;
  font-size: 18px;
`

const TagInActiveBtn = styled.button`
  margin: 0 10px;
  width: 80px;
  height: 35px;
  background-color: #CACACA;
  border: 0;
  color: white;
  font-size: 18px;
`

const Line = styled.div`
  height: 0px;
  border: 1px solid #666;
  margin-top: 10px;
  margin-bottom: 20px;
`

const StyledDiv = styled.div`
  display: flex;
`

const StyledP = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 17px;
  margin: 0 30px 10px 0;
`

const StyledSpan = styled.span`
  width: 120px;
`

const Dropdown = styled.select`
  /* width: 100%; */
  padding: 8px;
  position: relative;
  /* left: 30px; */
  height: 35px;
  width: 350px;
  font-size: 16px;
`

const StyledBtn = styled.div`
  display: flex;
  width: 100%;
  margin-left: 150px;
  gap: 40px;
`

import { useState } from "react";
import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInput from '../../components/atoms/officer/OfficerInput';
import OfficerDocTable from "../../components/atoms/officer/OfficerDocTable";

interface paramConfig {
  page: number;
  type: "req" | "res";
  companyName: string;
  isMine: boolean;
  myWorkerName: string | null;
  otherWorkerName: string;
  productName: string;
  startDate: string;
  endDate: string;
  status: string;
}

const OfficerManagePage = () => {
  const [isSupply, setIsSupply] = useState(true);
  const [params, setParams] = useState<paramConfig>({
    page: 1,
    type: "req",
    companyName: "",
    isMine: false,
    myWorkerName: "",
    otherWorkerName: "",
    productName: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const onClick = () => {

  }

  // 회사명 검색
  const handleCompanyName = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, companyName: value }));
  };

  // 본사 담당자명 검색
  const handleMyWorkerName = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, myWorkerName: value }));
  };

  // 거래처 담당자명 검색
  const handleOtherWorkerName = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, otherWorkerName: value }));
  };

  // 공급, 수급 변경
  const handleIsSupply = () => {
    setIsSupply((prevIsSupply) => !prevIsSupply);

    const initialParams: paramConfig = {
      page: 1,
      type: isSupply ? "req" : "res",
      companyName: "",
      isMine: false,
      myWorkerName: "",
      otherWorkerName: "",
      productName: "",
      startDate: "",
      endDate: "",
      status: "",
    };

    setParams(initialParams);

    if (isSupply) setParams((prevParams) => ({ ...prevParams, type: "res" }));
    else setParams((prevParams) => ({ ...prevParams, type: "req" }));
  }

  const handleDropdownChange = (selectedValue: string) => {
    const intValue = parseInt(selectedValue, 10);
    // 나중에 이 int값을 seq넘버로 쓰면 됨
    // char 혹은 string으로 올듯
    console.log(intValue);
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

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          거래명세서 관리
          {isSupply ? (
            <TagBtnDiv onClick={handleIsSupply}>
              <TagActiveBtn>공급</TagActiveBtn>
              <TagInActiveBtn>수급</TagInActiveBtn>
            </TagBtnDiv>
          ) : (
            <TagBtnDiv onClick={handleIsSupply}>
              <TagInActiveBtn>공급</TagInActiveBtn>
              <TagActiveBtn>수급</TagActiveBtn>
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
            <OfficerInput size={"underwriter"} />
          </StyledP>
        </StyledDiv>
        <StyledDiv>
          <StyledP>
            <StyledSpan>• 거래 일시</StyledSpan>
            <OfficerInput size={"underwriter"} />
          </StyledP>

          <StyledBtn>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={onClick}>
              조회
            </OfficerBtn>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={false}
              onClick={onClick}>
              초기화
            </OfficerBtn> 
          </StyledBtn>
        </StyledDiv>
        <OfficerDocTable isSupply={ isSupply } params={params}/>
        <TimeP>{getCurrentTime()}</TimeP>

        <Line/>

        <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={onClick}>
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

const TimeP = styled.p`
  margin: 5px 0 5px 85%;
`
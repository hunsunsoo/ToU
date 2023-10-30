import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInput from '../../components/atoms/officer/OfficerInput';
import OfficerDocTable from "../../components/atoms/officer/OfficerDocTable";

const OfficerManagePage = () => {
  const onClick = () => {

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
  };

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          거래명세서 관리
        </OfficerTitle>
        <Line/>
        <StyledDiv>
          <StyledP>
            <StyledSpan>• 업체명</StyledSpan>
            <OfficerInput size={"underwriter"} />
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
            <StyledSpan>• 담당자</StyledSpan>
            <OfficerInput size={"underwriter"} />
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
        <OfficerDocTable />
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

const Line = styled.div`
  height: 0px;
  border: 1px solid #666;
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
  width: 90px;
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
import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInputDiv from "../../components/organisms/officer/OfficerInputDiv";
import OfficerItemTable from "../../components/atoms/officer/OfficerItemTable";

const OfficerCreatePage = () => {
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
            onClick={onClick}>
            조회
          </OfficerBtn> 
        </StyledP>
        <OfficerInputDiv isStockManage={false}/>
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
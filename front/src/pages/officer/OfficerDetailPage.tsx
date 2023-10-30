import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerDemandDiv from "../../components/atoms/officer/OfficerDemandDiv";
import OfficerSupplyDiv from "../../components/atoms/officer/OfficerSupplyDiv";
import OfficerDetailTable from "../../components/atoms/officer/OfficerDetailTable";
import OfficerBillDiv from "../../components/atoms/officer/OfficerBillDiv";

const OfficerDetailPage = () => {
  const onClick = () => {

  }

  return( 
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          거래명세서 상세보기
        </OfficerTitle>
        <Line/>
        <StyledDiv>
          <StyledDivLeft>
            <p>• 거래명세서 확인</p>
            <OfficerDemandDiv />
          </StyledDivLeft>
          <StyledDivRight>
            <OfficerSupplyDiv />
          </StyledDivRight>
        </StyledDiv>
        <StyledSumDiv>
          <span>금   액 : 육백구십팔만오천원 정</span>
          <span>( ₩ 6,985,000 )</span>
        </StyledSumDiv>
        <OfficerDetailTable />
        <OfficerBillDiv />
        <BtnDiv>
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={false}
            onClick={onClick}>
            삭제
          </OfficerBtn>
          <BtnDivSub>
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={false}
              onClick={onClick}>
              수정
            </OfficerBtn> 
            <OfficerBtn
              isImg={false}
              isLarge={false}
              isActive={true}
              onClick={onClick}>
              PDF 저장
            </OfficerBtn> 
          </BtnDivSub>
        </BtnDiv>
      </ContentDiv>
    </MainDiv>
  )
}

export default OfficerDetailPage

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
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledDivLeft = styled.div`
  min-width: 45%;
`

const StyledDivRight = styled.div`
  min-width: 52%;
`

const StyledSpan = styled.span`
  
`

const StyledSumDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  margin-top: 10px;
  border: 1px solid black;
  color: black;
  font-size: 27px;
  font-weight: normal;
`

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const BtnDivSub = styled.div`
  display: flex;
  gap: 20px;
`
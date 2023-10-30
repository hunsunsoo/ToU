import { styled } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerTitle from "../../components/atoms/officer/OfficerTitle";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";
import OfficerInputDiv from "../../components/organisms/officer/OfficerInputDiv";

const OfficerStockPage = () => {
  const onClick = () => {

  }

  return (
    <MainDiv>
      <OfficerSideBar/>
      <ContentDiv>
        <OfficerTitle>
          공정/재고 관리
        </OfficerTitle>
        <Line/>
        <StyledP>
          • 기존 재고
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={onClick}>
            조회
          </OfficerBtn> 
        </StyledP>
        <OfficerInputDiv isInput={false}/>
        <StyledP>
          • 가공 상품 / 추가 재고
        </StyledP>
        <OfficerInputDiv isInput={false}/>
        <BtnDiv>
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={true}
            onClick={onClick}>
            등록
          </OfficerBtn>
          <OfficerBtn
            isImg={false}
            isLarge={false}
            isActive={false}
            onClick={onClick}>
            초기화
          </OfficerBtn>
        </BtnDiv>
      </ContentDiv>
    </MainDiv>
  );
};

export default OfficerStockPage;

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
  height: 40px;
  gap: 15px;
  font-size: 17px;
`

const BtnDiv = styled.div`
  display: flex;
  margin-left: 60%;
  gap: 50px
`
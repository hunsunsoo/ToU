import styled from "styled-components";

import TraderMainBtn from "../../molecules/trader/TraderMainBtn";

const TraderMainPageBtn = () => {
  return (
    <StyledComponent>
      <StyledCreateDiv>
        <StyledTitle>거래명세서 생성</StyledTitle>
        <StyledBtn>
          <TraderMainBtn
            route="/m/list"
            iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20Index%20Dividers.png"
            altText="Card Index Dividers"
            color="#668BFE"
          >
            <StyledText>
              거래명세서 <StyledSpan>불러오기</StyledSpan>
            </StyledText>
          </TraderMainBtn>

          <TraderMainBtn
            route="/m/create"
            iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png"
            altText="Card Index Dividers"
            color="#0687FF"
          >
            <StyledText>
              거래명세서
              <StyledSpan>작성하기</StyledSpan>
            </StyledText>
          </TraderMainBtn>
        </StyledBtn>
      </StyledCreateDiv>

      <StyledBottomBtn>
        <TraderMainBtn
          route="/m/state"
          iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png"
          altText="Magnifying Glass Tilted Left"
          color="#555F88"
        >
          <StyledText>
            거래명세서 <StyledSpan>상태 조회</StyledSpan>
          </StyledText>
        </TraderMainBtn>

        <TraderMainBtn
          route="/m/section"
          iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/World%20Map.png"
          altText="World Map"
          color="#BCDBFF"
        >
          <StyledText>
            <StyledBlack>
              구역별 거래<StyledBlackdSpan>내역 조회</StyledBlackdSpan>
            </StyledBlack>
          </StyledText>
        </TraderMainBtn>
      </StyledBottomBtn>
    </StyledComponent>
  );
};

export default TraderMainPageBtn;

const StyledComponent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 1.2rem;
`;

const StyledCreateDiv = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 13.4rem;
  border-radius: 20px;
  padding: 1rem;
  box-sizing: border-box;
  margin: 1rem 0;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const StyledBtn = styled.div`
  color: #000;
  display: flex;
  justify-content: space-around;
  height: 100%;
`;

const StyledSpan = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 1.6rem;
`;
const StyledBlackdSpan = styled.div`
  color: #000;
  font-weight: bold;
  font-size: 1.6rem;
`;

const StyledBlack = styled.div`
  color: #000;
`;

const StyledText = styled.div`
  font-size: 1.3rem;

`;

const StyledBottomBtn = styled.div`
  display: flex;
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정
  height: 100%;

  & > div:first-child {
    flex: 2; // 첫 번째 자식에게 flex 값을 2로 설정
    margin-right: 1rem;
  }

  & > div:last-child {
    flex: 1; // 두 번째 자식에게 flex 값을 1로 설정
  }
`;

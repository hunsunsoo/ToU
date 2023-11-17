import styled, { keyframes } from "styled-components";

import TraderMainBtn from "../../molecules/trader/TraderMainBtn";
import {
  StyledComponent,
  StyledCreateDiv,
  StyledTitle,
  StyledBtn,
  StyledSpan,
  StyledBlackdSpan,
  StyledBlack,
  StyledText,
  StyledBottomBtn,
} from "./../../../commons/style/traderStyle/TraderMainBtnStyle";

const TraderMainPageBtn = () => {
  return (
    <StyledComponent>
      <StyledAni3>
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
          {/* </StyledAni5> */}
        </StyledBtn>
      </StyledCreateDiv>
      </StyledAni3>
      <StyledAni6>
        <StyledBottomBtn>
          <TraderMainBtn
            route="/m/state"
            iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png"
            altText="Magnifying Glass Tilted Left"
            color="#555F88"
          >
            거래명세서 <StyledSpan>상태 조회</StyledSpan>
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
      </StyledAni6>
    </StyledComponent>
  );
};

export default TraderMainPageBtn;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp2 = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
   from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledAni3 = styled.div`
  animation: ${fadeInRight} 0.8s ease-out 0.8s both;
`

const StyledAni4 = styled.div`
  animation: ${fadeIn} 0.5s ease-out 1.4s both;
`

const StyledAni5 = styled.div`
  animation: ${fadeInLeft} 0.7s ease-out 1.8s both;
`

const StyledAni6 = styled.div`
  animation: ${fadeInRight} 0.5s ease-out 1.5s both;
`

const StyledAni7 = styled.div`
  animation: ${fadeInLeft} 0.5s ease-out 1.7s both;
`

import styled from "styled-components";

import TraderMainBtn from "../../molecules/trader/TraderMainBtn";

const TraderMainPageBtn = () => {
  return (
    <StyledDiv>
      <TraderMainBtn
        route="/m/list"
        iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20Index%20Dividers.png"
        altText="Card Index Dividers"
      >
        거래 명세서 불러오기
      </TraderMainBtn>

      <TraderMainBtn
        route="/m/create"
        iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png"
        altText="Card Index Dividers"
      >
        거래 명세서 생성
      </TraderMainBtn>

      <TraderMainBtn
        route="/m/state"
        iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png"
        altText="Magnifying Glass Tilted Left"
      >
        거래 상태 조회
      </TraderMainBtn>

      <TraderMainBtn
        route="/m/section"
        iconSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/World%20Map.png"
        altText="World Map"
      >
        구역별 거래 내역 조회
      </TraderMainBtn>
    </StyledDiv>
  );
};

export default TraderMainPageBtn;

const StyledDiv = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
`;

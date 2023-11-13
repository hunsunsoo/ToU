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

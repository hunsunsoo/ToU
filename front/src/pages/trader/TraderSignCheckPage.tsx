import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from 'styled-components';
import toast, { Toaster } from "react-hot-toast";

import { customAxios } from "../../components/api/customAxios";
import { StatementData } from "./../../types/TraderTypes";

import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import FIDOSign from "../../commons/FIDOSign";

interface AnimatedTextProps {
    start: boolean;
}

interface StyledContainerProps {
    start: boolean;
}

interface FlipTextProps {
    start: boolean;
}

interface RocketProps {
    start: boolean;
    end: boolean;
}

interface StarProps {
    start: boolean;
}

interface RemoveBarProps {
    start: boolean;
    end: boolean;
}

interface ShowTextProps {
    start: boolean;
}


const TraderSignCheckPage = () => {
  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );
  const { billId } = useParams<{ billId: string }>();

  const [animateActivate, setAnimateActivate] = useState(false);
  const [backgroundChange, setBackgroundChange] = useState(false);
  const [flipAnimationStart, setFlipAnimationStart] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [removeRocket, setRemoveRocket] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const [removeBar, setRemoveBar] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const [flipStage, setFlipStage] = useState(1);

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/m/main');
  };

  const fetchStatementData = () => {
    customAxios.get(`/statement/worker/detail/${billId}`).then((res) => {
      const data = res.data.data;
      setStatementData(data);
    });
  };

  const branchInfo = statementData?.resInfo?.branchName.split(" ");
  const companyName = branchInfo ? branchInfo[0] : "";
  const branchName = branchInfo ? branchInfo[1] : "";

    // 서명요청 핸들러
  const handleRequestSign = async () => {
    const isAuth = await FIDOSign();

    const requestBody = {
      statementSeq: statementData?.statementSeq, // statementData가 유효한 경우 statementSeq 값을 사용
      type: "SELL", // 요청 본문에 들어가야 하는 type 값
    };

    if(isAuth === true) {
      customAxios
        .post("/statement/worker/sign", requestBody)
        .then((response) => {
          fetchStatementData();
          handleSend();
        })
        .catch((error) => {
        });
      } else {
      toast.error("서명요청에 실패했습니다.");
    }
  };


  const handleSend = () => {
    setAnimateActivate(true);
    setRemoveBar(true);
    setBackgroundChange(true);
    setTimeout(() => {
        setAnimateActivate(true);
        setShowRocket(true);
    }, 500); // 500ms는 애니메이션 지속시간과 일치해야 함
    setTimeout(() => {
        setFlipAnimationStart(true);
    }, 600);
    setTimeout(() => {
        setFlipStage(2);
    }, 1000);
    setTimeout(() => {
        setRemoveRocket(true);
        setShowStar(true);
    }, 4000);
    setTimeout(() => {
        setFlipStage(3);
        setShowRocket(false);
        setRemoveRocket(true);
    }, 4500);
    setTimeout(() => {
        setShowBar(true);
    }, 6000);
  };

  useEffect(() => {
    fetchStatementData();
  }, [billId]);



  return (
    <StyledContainer start={backgroundChange}>
        <AnimatedHeader start={removeBar} end={showBar}>
        <StyledTraderHeader>
            <TraderHeader title="거래 명세서 서명" />
        </StyledTraderHeader>
      </AnimatedHeader>
      <StyledMainPaddingContainer >
         <RocketImage start={showRocket} end = {removeRocket}/>
         <StarImage start = {showStar}/>
         <AnimatedText start={animateActivate}>
          <StyledText1>{companyName}</StyledText1>
          <StyledTextG>
            <StyledText2>{branchName}</StyledText2>
            <StyledText3> 으로</StyledText3>
          </StyledTextG>
          <StyledText3>서명요청을</StyledText3>
          <FlipContainer>
            {flipStage === 1 && <TextComponent key="text1" start={flipStage === 1}>보낼까요?</TextComponent>}
            {flipStage === 2 && <TextComponent key="text2" start={flipStage === 2}>보내는 중</TextComponent>}
            {flipStage === 3 && <TextComponent key="text3" start={flipStage === 3}>보냈어요 !</TextComponent>}
          </FlipContainer>
        </AnimatedText>
      </StyledMainPaddingContainer>
      <AnimatedFooter start={removeBar} end={showBar}>
        <StyledFooter start={removeBar} end={showBar}>
            <TraderBtn size="Large" color="Blue" onClick={() => handleSend()}>
                보내기
            </TraderBtn>
        </StyledFooter>
        <StyledFooter2 start={removeBar} end={showBar}>
            <TraderBtn size="Large" color="Blue" onClick={() => goToMain()}>
                확인
            </TraderBtn>
        </StyledFooter2>
      </AnimatedFooter>
    </StyledContainer>
  );
};

export default TraderSignCheckPage;

const StyledContainer = styled.div<StyledContainerProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: ${props => props.start ? 'linear-gradient(0deg, #FFF 6.72%, #CEEDFF 37.49%, #FFF 85.23%);' : 'none'};
`;

const StyledTraderHeader = styled.div`
  width: 100%;
  /* position: sticky; */
  top: 0;
`;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  height: calc(100vh - 10rem);
  /* margin-bottom: 80px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFooter = styled.div<RemoveBarProps>`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: ${props => props.end ? 'none' : 'block'};
`;

const StyledFooter2 = styled.div<RemoveBarProps>`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: ${props => props.end ? 'block' : 'none'};
`;

const TextComponent = styled.div<FlipTextProps>`
  /* 공통 스타일 */
  backface-visibility: hidden;
  transform: rotateX(0deg);
  animation: ${props => props.start ? css`${fadeIn} 0.4s ease-in-out forwards` : css`${fadeOut} 0.4s ease-in-out forwards`};
  /* animation-delay: 0.2s;  */
`;

const shrinkMoveFont = keyframes`
  from {
    font-size: 1.6rem;
    transform: translateY(0);
  }
  to {
    font-size: 1.2rem;
    transform: translateY(8rem);
  }
`;

const flip = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(180deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOutUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-4rem);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;



const RocketImage = styled.div<RocketProps>`
  position: fixed; // 화면 중앙에 고정
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); // 정확한 중앙 위치 조정
  width: 9rem; // 이미지 크기 조절
  height: 9rem; // 이미지 크기 조절
  background-image: url('/Rocket.png'); // 이미지 경로 설정
  background-size: cover;
  animation: ${props => props.start ? css`${fadeIn} 0.7s ease-in-out forwards` : 'none'};
  animation: ${props => props.end ? css`${fadeOut} 0.4s ease-in-out forwards` :  css`${fadeIn} 0.7s ease-in-out forwards` };
  display: ${props => props.start ? 'block' : 'none'}; // 보여줄지 여부
`;


const StarImage = styled.div<StarProps>`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 9rem; 
  height: 9rem;
  background-image: url('/Star.png');
  background-size: cover;
  animation: ${fadeIn} 0.6s ease-in-out forwards;
  display: ${props => props.start ? 'block' : 'none'};
`;

const FlipContainer = styled.div`
  /* perspective: 1000px; */
  /* transform-style: preserve-3d; */
`;

const AnimatedText = styled.div<AnimatedTextProps>`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  animation: ${props => props.start ? css`${shrinkMoveFont} 0.8s ease-in-out forwards` : 'none'};
`;

const StyledText1 = styled.div`
  color: #3479FF;
`;
const StyledText2 = styled.span`
  color: #3479FF
`;

const StyledText3 = styled.span``;
const StyledText4 = styled.div``;
const StyledTextG = styled.div``;


const AnimatedHeader = styled.div<RemoveBarProps>`
  animation: ${props => props.start ? css`${fadeOutUp} 1s ease-in-out forwards` : 'none'};
  ${props => props.end && css`animation: ${fadeInDown} 1s ease-in-out forwards;`}
`;

const AnimatedFooter = styled.div<RemoveBarProps>`
  animation: ${props => props.start ? css`${fadeOut} 1s ease-in-out forwards` : 'none'};
  ${props => props.end && css`animation: ${fadeIn} 1s ease-in-out forwards;`}
`;
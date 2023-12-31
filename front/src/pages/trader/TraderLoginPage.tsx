import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import { UseAuth } from "../../commons/UseAuth";
import FIDOAuth from "../../commons/FIDOAuth";
import toast, { Toaster } from 'react-hot-toast';

const TraderLoginPage = () => {
  const navigate = useNavigate();

  const { login } = UseAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false); 

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await login(id, password);



      // API 호출 후 응답의 status가 200이면 페이지를 이동합니다.
      if (res && res.status === 200) {
        toast.success("로그인 성공했습니다.", {
          duration: 1000,
        });
        setTimeout(() => navigate("/m"), 0.5);
      } else {
        toast.error("로그인 실패했습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
        }, 800);
        setIsLoggingIn(false);
      }

    } catch (error) {
      setIsLoggingIn(false);
    }
  };

  return (
    <StyledMainPaddingContainer>
      <div><Toaster /></div>
      <StyledMsg as={isLoggingIn ? StyledAniLogin2 : undefined}>Welcome !</StyledMsg>
      <LoginDiv as={isLoggingIn ? StyledAniLogin : undefined}>
        <StyledDiv>
          <TextSpan> ID</TextSpan>
          <StyleInput value={id} onChange={(e) => setId(e.target.value)} />
        </StyledDiv>

        <StyledDiv>
          <TextSpan>PW</TextSpan>
          <StyleInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledDiv>
        <Button onClick={handleLogin}>로그인</Button>
        <OrSeparator>또는</OrSeparator>
        {/* 정훈이혀어어어어엉어엉 여기 겉 바(BIO) 속 FI */}
        {/* <BiometricButton>
          <Icon icon={faFingerprint} />
          생체인증 로그인
        </BiometricButton> */}
        <FIDOAuth isWeb={false}/>
      </LoginDiv>
    </StyledMainPaddingContainer>
  );
};

export default TraderLoginPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-color: #ecf4ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: space-around;

`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); // 그림자 추가
  background-color: #fff;
  border: none;
  margin: 1rem 0;
  height: 3rem;
  width: 80%;
  text-align: center;
  border-radius: 100px;
`;

const TextSpan = styled.span`
  width: 60px;
  color: #666666;
`;

const StyleInput = styled.input`
  width: 100%;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  height: 3rem;
`;

const Button = styled.button`
  background-color: #3a89ff;
  border: none;
  width: 80%;
  height: 3rem;
  margin: 1rem 0;
  border-radius: 100px;
  color: #fff;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); // 그림자 추가
`;

const OrSeparator = styled.div`
  font-size: 1rem;
  color: #666;
  margin: 20px 0;
  position: relative; // 상대적 위치 지정
  width: 80%; // 부모의 width에 맞춰 조정
  text-align: center; // 텍스트 중앙 정렬

  &::before,
  &::after {
    content: "";
    background-color: #666; // 선의 색상
    height: 1px; // 선의 높이
    width: 35%; // 선의 너비, 조정 가능
    position: absolute;
    top: 50%; // 선을 요소의 중앙에 위치
    transform: translateY(-50%);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const StyledMsg = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #6187e5;
  margin-left: 1rem;
`;


const fadeInLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(5rem);
  }
`;

const StyledAniLogin = styled.div`
  animation: ${fadeInLeft} 0.8s ease-out 0s both;
`

const StyledAniLogin2 = styled.div`
  animation: ${fadeInLeft} 0.8s ease-out 0.3s both;
`
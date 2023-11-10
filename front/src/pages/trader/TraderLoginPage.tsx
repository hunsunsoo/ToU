import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import { UseAuth } from "../../commons/UseAuth";

const TraderLoginPage = () => {
  const navigate = useNavigate();

  const { login } = UseAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(id, password);

      // API 호출 후 응답의 status가 200이면 페이지를 이동합니다.
      if (res && res.status === 200) {
        navigate("/m/main");
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      console.log("로그인 중 에러 발생:", error);
    }
  };

  return (
    <StyledMainPaddingContainer>
      <LoginDiv>
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
      </LoginDiv>
    </StyledMainPaddingContainer>
  );
};

export default TraderLoginPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-image: linear-gradient(
    0deg,
    #6ea8ff 0%,
    #acddff 68.85%,
    #c8f5ff 100%
  );

  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
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
  background-color: #fff;
  border: none;
  width: 80%;
  height: 3rem;
  margin: 1rem 0;
  border-radius: 100px;
  color: #3a89ff;
  font-size: 1.4rem;
`;

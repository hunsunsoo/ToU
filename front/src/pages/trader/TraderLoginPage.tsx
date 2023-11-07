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
          <TextSpan> I D</TextSpan>
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
      </LoginDiv>
      <button onClick={handleLogin}>로그인</button>
    </StyledMainPaddingContainer>
  );
};

export default TraderLoginPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-color: #eff7ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 8%;
  margin-left: 20%;
  margin-top: 1%;
`;

const StyledDiv = styled.div`
  display: flex;
`;

const TextSpan = styled.span`
  width: 60px;
  color: #666666;
`;

const StyleInput = styled.input`
  border: 1px solid #d9d9d9;
  width: 100%;
`;

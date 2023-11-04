import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import { UseAuth } from "../../commons/UseAuth";

const TraderLoginPage = () => {
  const { login } = UseAuth();
  
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  

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
      <button onClick={() => login(id, password)}>로그인</button>
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

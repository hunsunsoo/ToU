import styled from "styled-components";


export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  cursor: pointer;

  & > strong {
    margin-bottom: 10px;
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 1rem 0;
  align-items: flex-end;
`;

export const SignatureStatus = styled.span`
  color: red;
  margin-left: 1rem;
  font-size: 1rem;
`;

export const StyledDate = styled.div`
  margin: 1rem 0;
`;


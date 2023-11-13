import styled from "styled-components";

export const StyledComponent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 1.2rem;
`;

export const StyledCreateDiv = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 13rem;
  border-radius: 20px;
  padding: 1rem;
  box-sizing: border-box;
  margin: 1rem 0;
`;

export const StyledTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const StyledBtn = styled.div`
  color: #000;
  display: flex;
  justify-content: space-around;
  height: 100%;
`;

export const StyledSpan = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
`;

export const StyledBlackdSpan = styled.div`
  color: #000;
  font-weight: bold;
  font-size: 1.3rem;
`;

export const StyledBlack = styled.div`
  color: #000;
`;

export const StyledText = styled.div`
  font-size: 1rem;

`;

export const StyledBottomBtn = styled.div`
  display: flex;
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정
  height: 100%;

  & > div:first-child {
    flex: 2; // 첫 번째 자식에게 flex 값을 2로 설정
    margin-right: 0.5rem;
  }

  & > div:last-child {
    flex: 1; // 두 번째 자식에게 flex 값을 1로 설정
  }
`;

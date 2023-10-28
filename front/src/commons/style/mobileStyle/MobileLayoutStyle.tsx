import styled from "styled-components";

/** 메인 컨테이너 + 패딩 스타일 */
export const MainPaddingContainer = styled.div`
  padding: 1rem 1.5rem 1rem 1.5rem;
  box-sizing: border-box;
  margin-top: 60px;  // 헤더의 높이. 실제 값으로 조정 필요.
  height: calc(100vh - 100px);  // 화면의 높이에서 헤더의 높이를 뺀 값.
  overflow-y: auto;
  /* position: relative; */
`;

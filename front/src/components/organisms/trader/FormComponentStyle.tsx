import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border: 1px solid black;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

export const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid black;
  background-color: #eaeaea;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledSpan = styled.span`
  display: flex;
  align-items: center;
`;

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  cursor: pointer;

  & > strong {
    margin-bottom: 10px;
  }

  // 수정
  & > ${Table} {
    display: none;
  }

  &[data-expanded="true"] > ${Table} {
    display: table; // table로 변경
  }
`;

export const Styles = styled.div`
  table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;

    th,
    td {
      padding: 0.5rem;
      border: 1px solid black; // 모든 셀에 테두리를 적용
    }

    th {
      background-color: #eaeaea; // 헤더의 배경색을 회색으로 변경
    }

    td {
      background-color: white; // 아이템의 배경색을 흰색으로 변경
    }
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

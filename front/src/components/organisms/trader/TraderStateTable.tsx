import React from "react";
import styled from "styled-components";

interface TraderStateTableProps {
  selectedRole: string;
  statementList: Array<{
    reqORres: number;
    statementSeq: number;
    branchName: string;
    productName: string;
    tradeDate: string;
    statementStatus: string;
  }>;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR"); // 한국어 날짜 포맷으로 변경 ('yyyy-mm-dd')
};

const TraderStateTable: React.FC<TraderStateTableProps> = ({
  selectedRole,
  statementList,
}) => {
  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>분류</th>
            <th>상태</th>
            <th>거래명세서</th>
          </tr>
        </thead>
        <tbody>
          {statementList.map(
            (
              item,
              index // 이제 statementList를 map을 사용하여 표시합니다.
            ) => (
              <StyledRow
                key={item.statementSeq} // key로는 고유한 statementSeq를 사용하는 것이 좋습니다.
                onClick={
                  () =>
                    (window.location.href = `http://localhost:3000/m/sign/${item.statementSeq}`) // 필요에 따라 URL을 수정하세요.
                }
              >
                <td>{item.reqORres === 0 ? "공급" : item.reqORres === 1 ? "수급" : ""}</td>
                <StyledStatus status={item.statementStatus}>
                  {item.statementStatus}
                </StyledStatus>
                <td>{`${item.branchName}\n${item.productName}\n${formatDate(
                  item.tradeDate
                )}`}</td>
              </StyledRow>
            )
          )}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default TraderStateTable;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid gray;
    white-space: pre-line;
  }

  th {
    background-color: #eaeaea;
    border-bottom: 2px solid black;
  }
`;

interface StyledStatusProps {
  status: string;
}

const StyledStatus = styled.td<StyledStatusProps>`
  font-weight: bold;
  color: ${(props) => {
    switch (props.status) {
      case "서명 필요":
        return "blue";
      case "COMPLETION":
        return "green";
      case "거절된 문서":
        return "red";
      case "서명 대기중":
        return "black";
      default:
        return "black";
    }
  }};
`;

const StyledRow = styled.tr`
  cursor: pointer;
`;

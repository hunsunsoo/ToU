import React from "react";
import styled from "styled-components";

interface TraderStateTableProps {
  selectedRole: string;
}

interface DataTable {
  status: string;
  description: string[];
}

const TraderStateTable: React.FC<TraderStateTableProps> = ({
  selectedRole,
}) => {
  const data: DataTable[] = [
    {
      status: "서명 필요",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "완료된 문서",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "거절된 문서",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "서명 대기중",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "서명 대기중",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "서명 대기중",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "서명 대기중",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
    {
      status: "서명 대기중",
      description: ["업체명", "하위빠위", "2023-10-19 06:43"],
    },
  ];

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
          {data.map((item, index) => (
            <StyledRow
              key={index}
              onClick={() =>
                (window.location.href = `http://localhost:3000/m/sign/${item.description[0]}`)
              }
            >
              <td>{selectedRole === "전체" ? "수급" : selectedRole}</td>
              <StyledStatus status={item.status}>{item.status}</StyledStatus>
              <td>{item.description.join("\n")}</td>
            </StyledRow>
          ))}
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
      case "완료된 문서":
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

import { useState, useEffect } from "react";
import styled from "styled-components";

import { StatementData } from "../../../types/TraderTypes";
import { customAxios } from "../../api/customAxios";

const FormComponent = () => {
  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  useEffect(() => {
    customAxios.get("/statement/worker/detail/1").then((res) => {
      console.log(res.data.data);
      setStatementData(res.data.data);
    });
  }, []);

  if (!statementData) return <div>Loading...</div>;

  return (
    <Styles>
      <h2>거래명세표</h2>

      <StyledSection
        data-expanded={expandedSection === "request" ? "true" : "false"}
        onClick={() => toggleSection("request")}
      >
        <strong>요청 정보 (공급자)</strong>

        <Table>
          <tbody>
            <TableRow>
              <TableHeader>회사명</TableHeader>
              <TableCell>{statementData.reqInfo.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>사업자 등록번호</TableHeader>
              <TableCell>{statementData.reqInfo.registrationNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>지점명</TableHeader>
              <TableCell>{statementData.reqInfo.branchName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>연락처</TableHeader>
              <TableCell>{statementData.reqInfo.branchContact}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>담당자</TableHeader>
              <TableCell>{statementData.reqInfo.workerName}</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </StyledSection>

      <StyledSection
        data-expanded={expandedSection === "response" ? "true" : "false"}
        onClick={() => toggleSection("response")}
      >
        <strong>응답 정보 (인수자/수급자)</strong>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>회사명</TableHeader>
              <TableCell>{statementData.resInfo.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>사업자 등록번호</TableHeader>
              <TableCell>{statementData.resInfo.registrationNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>지점명</TableHeader>
              <TableCell>{statementData.resInfo.branchName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>연락처</TableHeader>
              <TableCell>{statementData.resInfo.branchContact}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>담당자</TableHeader>
              <TableCell>{statementData.resInfo.workerName}</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </StyledSection>

      <strong>품목정보</strong>
      <table>
        <thead>
          <tr>
            <th>상품 코드</th>
            <th>수량</th>
            <th>가격</th>
            <th>총 가격</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {statementData.itemList.map((item, index) => (
            <tr key={index}>
              <td>{item.stockCode}</td>
              <td>
                {item.stockQuantity}
                {item.stockUnit}
              </td>
              <td>{item.stockPrice}</td>
              <td>{item.stockTotalPrice}</td>
              <td>{item.note || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <>{statementData.tradeDate}</>
    </Styles>
  );
};

export default FormComponent;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border: 1px solid black;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid black;
  background-color: #eaeaea;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
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

const Styles = styled.div`
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

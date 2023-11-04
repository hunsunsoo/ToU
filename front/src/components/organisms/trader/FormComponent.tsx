import { useState, useEffect } from "react";
import styled from "styled-components";

import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import { StatementData } from "../../../types/TraderTypes";
import { customAxios } from "../../api/customAxios";

const FormComponent = () => {
  // 거래명세서 데이터
  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );

  // 표 펼쳐보기 관련
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // 거래명세서 상세보기 api 요청
  useEffect(() => {
    customAxios.get("/statement/worker/detail/1").then((res) => {
      // 임시로 1 넣어놓음. 수정필요함
      console.log(res.data.data);
      setStatementData(res.data.data);
    });
  }, []);

  // 거래명세서 서명 상태 관련
  const isSigned =
    statementData &&
    statementData.reqInfo !== null &&
    statementData.resInfo !== null;

  if (!statementData) return <div>Loading...</div>;

  return (
    <Styles>
      <StyledTitle>
        <div>거래명세표</div>
        {isSigned && (
          <SignatureStatus>서명이 완료된 거래명세서입니다.</SignatureStatus>
        )}
      </StyledTitle>

      <StyledSection
        data-expanded={expandedSection === "request" ? "true" : "false"}
        onClick={() => toggleSection("request")}
      >
        <StyledDiv>
          <strong>요청 정보 (공급자)</strong>
          <StyledSpan>
            {expandedSection === "request" ? "닫기" : "펼쳐보기"}
            {expandedSection === "request" ? (
              <HiChevronUp />
            ) : (
              <HiChevronDown />
            )}
          </StyledSpan>
        </StyledDiv>

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
        <StyledDiv>
          <strong>응답 정보 (인수자/수급자)</strong>
          <StyledSpan>
            {expandedSection === "response" ? "닫기" : "펼쳐보기"}
            {expandedSection === "response" ? (
              <HiChevronUp />
            ) : (
              <HiChevronDown />
            )}
          </StyledSpan>
        </StyledDiv>

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

      <StyledDiv>
        <strong>품목정보</strong>
      </StyledDiv>
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

      <StyledDate>{statementData.tradeDate}</StyledDate>
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

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
`;

const StyledSection = styled.div`
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

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 1rem 0;
  align-items: flex-end;
`;

const SignatureStatus = styled.span`
  color: red;
  margin-left: 1rem;
  font-size: 1rem;
`;

const StyledDate = styled.div`
  margin: 1rem 0;
`;

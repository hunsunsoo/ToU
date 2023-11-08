import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import { StatementData } from "../../../types/TraderTypes";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  StyledDiv,
  StyledSpan,
  StyledSection,
  Styles,
  StyledTitle,
  SignatureStatus,
  StyledDate,
} from "./FormComponentStyle";

interface FormComponentProps {
  statementData: StatementData;
  status: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  statementData,
  status,
}) => {

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  const showSignatureStatus = status === "READY";

  return (
    <Styles>
      <StyledTitle>
        <div>거래명세표</div>
        {showSignatureStatus && (
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
              <TableCell>{statementData?.reqInfo?.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>사업자 등록번호</TableHeader>
              <TableCell>
                {statementData?.reqInfo?.registrationNumber}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>지점명</TableHeader>
              <TableCell>{statementData?.reqInfo?.branchName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>연락처</TableHeader>
              <TableCell>{statementData?.reqInfo?.branchContact}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>담당자</TableHeader>
              <TableCell>{statementData?.reqInfo?.workerName}</TableCell>
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
              <TableCell>{statementData?.resInfo?.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>사업자 등록번호</TableHeader>
              <TableCell>
                {statementData?.resInfo?.registrationNumber}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>지점명</TableHeader>
              <TableCell>{statementData?.resInfo?.branchName}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>연락처</TableHeader>
              <TableCell>{statementData?.resInfo?.branchContact}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>담당자</TableHeader>
              <TableCell>{statementData?.resInfo?.workerName}</TableCell>
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

      <StyledDate>{formatDate(statementData.tradeDate)}</StyledDate>
    </Styles>
  );
};

export default FormComponent;
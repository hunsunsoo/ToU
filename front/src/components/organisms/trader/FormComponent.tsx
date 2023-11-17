import styled from "styled-components";
import { StatementData } from "../../../types/TraderTypes";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  StyledDiv,
  Styles,
  StyledTitle,
  SignatureStatus,
  StyledDate,
  Line,
} from "./FormComponentStyle";

interface FormComponentProps {
  statementData: StatementData;
  status: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  statementData,
  status,
}) => {
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("ko-KR").format(number);
  };

  const getTotalStockQuantity = () => {
    return statementData.itemList.reduce(
      (acc, item) => acc + item.stockQuantity,
      0
    );
  };

  let signatureStatusMessage;
  if (status === "READY") {
    signatureStatusMessage = "서명이 완료된 거래명세서입니다.";
  }

  // 날짜 표기 형식 변환
  const formatDateString = (dateString: string | undefined) => {
    if (!dateString) {
      return "";
    }
  
    const formattedDate = new Date(dateString);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const hours = formattedDate.getHours().toString().padStart(2, "0");
    const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
  
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  return (
    <Styles>
      <StyledTitle>
        <div>거래명세표</div>
        {signatureStatusMessage && (
          <SignatureStatus>{signatureStatusMessage}</SignatureStatus>
        )}
      </StyledTitle>

      <StyledDate>
        <div>4020-1214-{statementData.statementSeq}</div>
        <div>{formatDateString(statementData.tradeDate)}</div>
      </StyledDate>
      <Line />
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>요청정보</TableHeader>
            <TableHeader>회사명</TableHeader>
            <TableCell>{statementData?.reqInfo?.companyName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>지점명</TableHeader>
            <TableCell>{statementData?.reqInfo?.branchName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>사업자 등록번호</TableHeader>
            <TableCell>{statementData?.reqInfo?.registrationNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>연락처</TableHeader>
            <TableCell>{statementData?.reqInfo?.branchContact}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>담당자</TableHeader>
            <TableCell>
              {statementData?.reqInfo?.workerName ? (
                statementData.reqInfo.workerName
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  서명필요
                </span>
              )}
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
      <Line />
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>응답정보</TableHeader>
            <TableHeader>회사명</TableHeader>
            <TableCell>{statementData?.resInfo?.companyName}</TableCell>
          </TableRow>

          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>지점명</TableHeader>
            <TableCell>{statementData?.resInfo?.branchName}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>사업자 등록번호</TableHeader>
            <TableCell>{statementData?.resInfo?.registrationNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>연락처</TableHeader>
            <TableCell>{statementData?.resInfo?.branchContact}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>담당자</TableHeader>
            <TableCell>
              {statementData?.resInfo?.workerName ? (
                statementData.resInfo.workerName
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  서명필요
                </span>
              )}
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
      <Line />

      <table>
        <thead>
          <tr>
            <th>품목명</th>
            <th>수량</th>
            <th>단가</th>
            <th>공급가액</th>
          </tr>
        </thead>

        <tbody>
          {statementData.itemList.map((item, index) => (
            <tr key={index}>
              <td>{item.stockName}</td>
              <td>
                {formatNumber(item.stockQuantity)}
                {item.stockUnit}
              </td>
              <td>{formatNumber(item.stockPrice)}원</td>
              {/* formatNumber 함수를 사용하여 단가 형식화 */}
              <td>{formatNumber(item.stockTotalPrice)}원</td>
              {/* formatNumber 함수를 사용하여 공급가액 형식화 */}
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <StyledTotal>총 금액</StyledTotal>
            <StyledTotal>
              {formatNumber(statementData.totalPrice)}원
            </StyledTotal>
          </tr>
        </tbody>
      </table>
      {statementData.resInfo?.branchType === "SELL" ?
      <>
        {statementData.itemList.map((item, index) => (
          <img src={`https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=https://k9b310.p.ssafy.io/product/${item.stockSeq}`} alt="QR" />
        ))}
        <p style={{height: "30px"}}></p>
      </>
      : null}
    </Styles>
  );
};

export default FormComponent;

const StyledTotal = styled.td`
  font-weight: bold;
`;

import { StatementData } from "../../../types/TraderTypes";
import {
  StyledDiv,
  StyledTitle,
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
  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("ko-KR").format(number);
  };

  return (
    <>
      <StyledTitle>
        <div>거래명세표</div>
      </StyledTitle>

      <div>
        <StyledDiv>
          <strong>요청 정보 (공급자)</strong>
        </StyledDiv>
        <div>회사명{statementData?.reqInfo?.companyName}</div>
        <div>사업자 등록번호{statementData?.reqInfo?.registrationNumber}</div>
        <div>지점명{statementData?.reqInfo?.branchName}</div>
        <div>연락처{statementData?.reqInfo?.branchContact}</div>
        <div>담당자{statementData?.reqInfo?.workerName}</div>
      </div>

      <div>
        <StyledDiv>
          <strong>응답 정보</strong>
        </StyledDiv>
        <div>회사명{statementData?.resInfo?.companyName}</div>
        <div>사업자 등록번호{statementData?.resInfo?.registrationNumber}</div>
        <div>지점명{statementData?.resInfo?.branchName}</div>
        <div>연락처{statementData?.resInfo?.branchContact}</div>
        <div>담당자{statementData?.resInfo?.workerName}</div>
      </div>

      <StyledDiv>
        <strong>품목정보</strong>
      </StyledDiv>
      {statementData.itemList.map((item, index) => (
        <div key={index}>
          {item.stockName}

          {formatNumber(item.stockQuantity)}
          {item.stockUnit}

          {formatNumber(item.stockPrice)}
          {/* formatNumber 함수를 사용하여 단가 형식화 */}
          {formatNumber(item.stockTotalPrice)}
          {/* formatNumber 함수를 사용하여 공급가액 형식화 */}
          {item.note || "-"}
        </div>
      ))}
      <StyledDate>{formatDate(statementData.tradeDate)}</StyledDate>
    </>
  );
};

export default FormComponent;

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck  } from "@fortawesome/sharp-regular-svg-icons";
import { faSquare } from "@fortawesome/sharp-light-svg-icons";
import toast from 'react-hot-toast';

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderConfirmTable from "../../components/organisms/trader/TraderConfirmTable";
import TraderConfirmInfoTitle from "../../components/organisms/trader/TraderConfirmInfoTitle";
import { customAxios } from "../../components/api/customAxios";
import { StatementData } from "./../../types/TraderTypes";

const TraderConfirmPage = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [section, setSection] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDateChecked, setIsDateChecked] = useState(false);
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [icon, setIcon] = useState(faSquare);
  const [dateIcon, setDateIcon] = useState(faSquare);
  const [tableIcon, setTableIcon] = useState(faSquare);

  const [isValid, setIsValid] = useState(false);

  const { billId } = useParams<{ billId: string }>();
  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );

  const [statementItemList, setStatementItemList] = useState([]);


  useEffect(() => {
    customAxios
    .get(`/statement/worker/detail/${billId}`)
      .then((res) => {
        const data = res.data.data;
        setStatementData(data);

        const formattedData = data.itemList.map((item: any, index: number) => {
          return {
            id: index,
            category: item.stockName,
            quantity: item.stockQuantity,
            price: item.stockPrice
          };
      });
      setStatementItemList(formattedData);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleIconClick = () => {
    setIsChecked(!isChecked);
    setIcon(isChecked ? faSquare : faCheck);
  };

  
  const handleDateIconClick = () => {
    setIsDateChecked(!isDateChecked);
    setDateIcon(isDateChecked ? faSquare : faCheck);
  };
  
  const handleItemIconClick = () => {
    setIsItemChecked(!isItemChecked);
    setTableIcon(isItemChecked ? faSquare : faCheck);
  };

  const checkValidity = () => {
    setIsValid(isChecked && isDateChecked && isItemChecked);
  };

  useEffect(() => {
    checkValidity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, isDateChecked, isItemChecked]);


      // 삭제 핸들러
  const handleDelete = () => {
    customAxios
      .delete(`/statement/worker/${billId}`)
      .then((response) => {
        toast.success("거래명세서가 삭제 되었습니다.");
      })
      .catch((error) => {
        toast.error("삭제에 실패했습니다.");
      });
      navigate(`/m/main`);
  };


  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 검토" />
      </StyledHeader>
      <StyledBody>
        <MainPaddingContainer>
          <StyledInfoTitle>
            <TraderConfirmInfoTitle infoTitle="인수자 정보" />
            <StyledSpan>
              인수자 정보를 확인하세요.
              <FontAwesomeIcon
                icon={icon}
                size="2xl"
                style={{ color: "#000000" }}
                onClick={handleIconClick}
              />
            </StyledSpan>
          </StyledInfoTitle>
          <TraderInputTitle
            inputTitle="업체명"
            size="Large"
            value={statementData?.resInfo?.companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={isChecked}
          />
          <TraderInputTitle
            inputTitle="관할 구역"
            size="Large"
            value={statementData?.resInfo?.branchName}
            onChange={(e) => setSection(e.target.value)}
            disabled={isChecked}
          />
           <StyledInfoTitle>
            <TraderConfirmInfoTitle infoTitle="거래 정보" />
            <StyledSpan>
              거래 일자를 확인하세요.
                <FontAwesomeIcon
                  icon={dateIcon}
                  size="2xl"
                  style={{ color: "#000000" }}
                  onClick={handleDateIconClick}
                />
              </StyledSpan>
           </StyledInfoTitle>
           <TraderInputTitle
            inputTitle="거래 일자"
            size="Large"
            value={statementData?.tradeDate}
            onChange={(e) => setSection(e.target.value)}
            disabled={isDateChecked}
          />
          <StyledInfoTitle>
            <TraderConfirmInfoTitle infoTitle="품목 정보" />
            <StyledSpan>
              품목 정보를 확인하세요.
              <FontAwesomeIcon
                icon={tableIcon}
                size="2xl"
                style={{ color: "#000000" }}
                onClick= {handleItemIconClick}
              />
            </StyledSpan>
          </StyledInfoTitle>
          {/* <TraderItemSearchBox/> */}
          <StyledTable>
            <TraderConfirmTable isItemChecked={isItemChecked} data={statementItemList}/>
          </StyledTable>
        </MainPaddingContainer>
      </StyledBody>
      <StyledFooter>
        <TraderBtn size="LargeL1" color="Grey" onClick={handleDelete}>
            삭제
        </TraderBtn>
        <TraderBtn
          size="LargeR2"
          color={isValid ? "Blue" : "BlueDisabled"}
          onClick={() => {
            navigate(`/m/sign/${billId}`);
          }}
          disabled={!isValid}
        >
          명세서 생성
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderConfirmPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`;
const StyledBody = styled.div`
`;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const StyledInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 4vh;
  width: 22rem;
  border-bottom: 0.8px solid var(--festie-gray-600, #949494);
  font-size: 0.9rem;
  color: gray;
`;

const StyledTable = styled.div`
  margin-top: 1rem;
`
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck  } from "@fortawesome/sharp-regular-svg-icons";
import { faSquare } from "@fortawesome/sharp-light-svg-icons";


import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
// import TraderItemSearchBox from "../../components/organisms/trader/TraderItemSearchBox";
import TraderConfirmTable from "../../components/organisms/trader/TraderConfirmTable";
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
        console.log(data)
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
    .catch((error) => {
      console.error('해당하는 상품이 없습니다.', error);
    });
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
  }, [isChecked, isDateChecked, isItemChecked]);



  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 검토" />
        <TraderSubtitle subtitle="거래 품목 확인" />
      </StyledHeader>
      <StyledBody>
        <MainPaddingContainer>
          <StyledInfoTitle>
            <TraderInfoTitle infoTitle="인수자 정보" />
            <StyledSpan>
              <FontAwesomeIcon
                icon={icon}
                size="xl"
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
            <TraderInfoTitle infoTitle="거래 정보" />
            <StyledSpan>
                <FontAwesomeIcon
                  icon={dateIcon}
                  size="xl"
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
            <TraderInfoTitle infoTitle="품목 정보" />
            <StyledSpan>
              <FontAwesomeIcon
                icon={tableIcon}
                size="xl"
                style={{ color: "#000000" }}
                onClick= {handleItemIconClick}
              />
            </StyledSpan>
          </StyledInfoTitle>
          {/* <TraderItemSearchBox/> */}
          <TraderConfirmTable isItemChecked={isItemChecked} data={statementItemList}/>
        </MainPaddingContainer>
      </StyledBody>
      <StyledFooter>
        <TraderBtn
          size="Large"
          color={isValid ? "Blue" : "Grey"}
          onClick={() => {
            navigate(`/m/create/sign/${billId}`);
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
  /* padding-top: 60px; */
  /* position: fixed; */
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
  justify-content: flex-end;
  height: 4vh;
  width: 80px;
  border-bottom: 0.8px solid var(--festie-gray-600, #949494);
`;


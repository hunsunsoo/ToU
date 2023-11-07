import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { customAxios } from "../../components/api/customAxios";
import { StatementData } from "./../../types/TraderTypes";
import FormComponent from "../../components/organisms/trader/FormComponent";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";

const TraderSignPage = () => {
  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );
  const [status, setStatus] = useState<string>("");
  const { billId } = useParams<{ billId: string }>();

  useEffect(() => {
    customAxios
    .get(`/statement/worker/detail/${billId}`)
      .then((res) => {
        const data = res.data.data;
        console.log(data)
        setStatementData(data);

        if (data.reqInfo === null && data.resInfo === null) {
          setStatus("WAITING");
        } else if (data.resInfo === null) {
          setStatus("PREPARING");
        } else {
          setStatus("READY");
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error("Failed to fetch statement data", error);
      });
  }, []);

  const renderButtons = () => {
    // 응답 정보가 null이라면 "서명"과 "거절" 버튼을 렌더링합니다.
    if (statementData && statementData.resInfo === null) {
      return (
        <>
          <TraderBtn size="LargeL1" color="Grey">
            거절
          </TraderBtn>
          <TraderBtn size="LargeR2" color="Blue">
            서명
          </TraderBtn>
        </>
      );
    }
    // 응답 정보와 요청 정보가 모두 null이 아니라면 "다음" 버튼을 렌더링합니다.
    if (
      statementData &&
      statementData.reqInfo !== null &&
      statementData.resInfo !== null
    ) {
      return (
        <TraderBtn size="Large" color="Blue">
          메인으로
        </TraderBtn>
      );
    }
    // 그 외의 경우에는 버튼을 렌더링하지 않습니다.
    return null;
  };

  if (!statementData) return <div>Loading...</div>;

  return (
    <StyledContainer>
      <StyledTraderHeader>
        <TraderHeader title="거래 명세서 서명" />
      </StyledTraderHeader>
      <StyledMainPaddingContainer>
        <FormComponent statementData={statementData} status={status} />
      </StyledMainPaddingContainer>
      <StyledButtonContainer>{renderButtons()}</StyledButtonContainer>
    </StyledContainer>
  );
};
export default TraderSignPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  height: calc(100vh - 63px);
`;

const StyledTraderHeader = styled.div`
  position: sticky;
  top: 0;
`;

const StyledContainer = styled.div``;

const StyledButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

// <TraderBtn size="LargeR2" color="Blue">
//     서명
// </TraderBtn>
// <TraderBtn size="LargeL1" color="Grey">
//     거절
// </TraderBtn>
// <TraderBtn size="Large" color="Blue">
//     다음
// </TraderBtn>

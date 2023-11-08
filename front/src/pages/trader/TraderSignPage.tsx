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
    customAxios.get(`/statement/worker/detail/${billId}`).then((res) => {
      const data = res.data.data;
      console.log(data);
      setStatementData(data);

      if (data.reqInfo === null && data.resInfo === null) {
        setStatus("WAITING");
      } else if (data.resInfo === null) {
        setStatus("PREPARING");
      } else {
        setStatus("READY");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderButtons = () => {
    // reqInfo와 resInfo가 모두 null일 때 "서명요청" 버튼을 렌더링합니다.
    if (
      statementData &&
      statementData.reqInfo === null &&
      statementData.resInfo === null
    ) {
      return (
        <TraderBtn size="Large" color="Blue" onClick={handleRequestSign}>
          서명요청
        </TraderBtn>
      );
    }
    // reqInfo는 데이터가 있고 resInfo가 null이면 "거절"과 "서명" 버튼을 렌더링합니다.
    else if (
      statementData &&
      statementData.reqInfo !== null &&
      statementData.resInfo === null
    ) {
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
    // reqInfo와 resInfo가 모두 null이 아니라면 "메인으로" 버튼을 렌더링합니다.
    else if (
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

  const handleRequestSign = () => {
    const requestBody = {
      statementSeq: statementData?.statementSeq, // statementData가 유효한 경우 statementSeq 값을 사용
      type: "SELL", // 요청 본문에 들어가야 하는 type 값
    };

    customAxios
      .post("/statement/worker/sign", requestBody)
      .then((response) => {
        console.log("Sign request successful", response);
        // 요청 성공 후의 처리 로직을 여기에 작성하세요.
      })
      .catch((error) => {
        console.error("Sign request failed", error);
        // 요청 실패 시의 처리 로직을 여기에 작성하세요.
      });
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
  margin-bottom: 80px;
`;

const StyledTraderHeader = styled.div`
  position: sticky;
  top: 0;
`;

const StyledContainer = styled.div``;

const StyledButtonContainer = styled.div`
  width: 100%;
  position: fixed;
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { customAxios } from "../../components/api/customAxios";
import { StatementData } from "./../../types/TraderTypes";
import FormComponent from "../../components/organisms/trader/FormComponent";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import { UserInfoState } from "../../store/State";

const TraderSignPage = () => {
  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );
  const [status, setStatus] = useState<string>("");
  const { billId } = useParams<{ billId: string }>();
  const currentBranchSeq = useRecoilValue(UserInfoState).branchSeq;

  useEffect(() => {
    customAxios.get(`/statement/worker/detail/${billId}`).then((res) => {
      const data = res.data.data;
      console.log(data);
      setStatementData(data);

      if (data.reqInfo.workerName === null && data.resInfo.workerName === null) {
        setStatus("WAITING");
      } else if (data.resInfo.workerName === null) {
        setStatus("PREPARING");
      } else {
        setStatus("READY");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderButtons = () => {
    // "메인으로" 버튼을 렌더링해야 하는 조건을 확인합니다.
    const shouldShowMainButton =
      (statementData?.reqInfo?.workerName && statementData?.resInfo?.workerName) || // 첫 번째 조건: 둘 다 null이 아닐 때
      (statementData?.reqInfo?.branchSeq === currentBranchSeq && statementData?.reqInfo?.workerName); // 두 번째 조건
  
    if (shouldShowMainButton) {
      return (
        <TraderBtn size="Large" color="Blue">
          메인으로
        </TraderBtn>
      );
    } else if (
      statementData?.reqInfo?.workerName === null &&
      statementData?.resInfo?.workerName === null
    ) {
      // reqInfo와 resInfo가 모두 null일 때 "서명요청" 버튼을 렌더링합니다.
      return (
        <TraderBtn size="Large" color="Blue" onClick={handleRequestSign}>
          서명요청
        </TraderBtn>
      );
    } else if (
      statementData &&
      statementData.reqInfo?.workerName !== null &&
      statementData.resInfo?.workerName === null
    ) {
      // reqInfo는 데이터가 있고 resInfo가 null이면 "거절"과 "서명" 버튼을 렌더링합니다.
      return (
        <>
          <TraderBtn size="LargeL1" color="Grey" onClick={handleRefusal}>
            거절
          </TraderBtn>
          <TraderBtn size="LargeR2" color="Blue" onClick={handleResponseSign}>
            서명
          </TraderBtn>
        </>
      );
    }
    // 그 외의 경우에는 버튼을 렌더링하지 않습니다.
    return null;
  };
  

  // 서명요청 핸들러
  const handleRequestSign = () => {
    const requestBody = {
      statementSeq: statementData?.statementSeq, // statementData가 유효한 경우 statementSeq 값을 사용
      type: "SELL", // 요청 본문에 들어가야 하는 type 값
    };

    customAxios
      .post("/statement/worker/sign", requestBody)
      .then((response) => {
        toast.success("서명요청을 보냈습니다.");
      })
      .catch((error) => {
        toast.error("서명요청에 실패했습니다.");
      });
  };

  // 서명 응답 핸들러
  const handleResponseSign = () => {
    const requestBody = {
      statementSeq: statementData?.statementSeq,
      type: "BUY",
    };

    customAxios
      .post("/statement/worker/sign", requestBody)
      .then((response) => {
        toast.success("서명을 완료했습니다.");
      })
      .catch((error) => {
        toast.error("서명에 실패했습니다.");
      });
  };

  // 거절 핸들러
  const handleRefusal = () => {
    const requestBody = {
      statementSeq: statementData?.statementSeq, // statementData가 유효한 경우 statementSeq 값을 사용
    };

    customAxios
      .post("/statement/worker/refusal", requestBody)
      .then((response) => {
        toast.success("거절 되었습니다.");
      })
      .catch((error) => {
        toast.error("거절에 실패했습니다.");
      });
  };

  if (!statementData) return <div>Loading...</div>;

  return (
    <StyledContainer>
      <Toaster position="top-center" reverseOrder={false} />
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
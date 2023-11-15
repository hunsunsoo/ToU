import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import styled, { keyframes } from "styled-components";

import { customAxios } from "../../components/api/customAxios";
import { StatementData } from "./../../types/TraderTypes";
import FormComponent from "../../components/organisms/trader/FormComponent";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import { UserInfoState } from "../../store/State";
import FIDOSign from "../../commons/FIDOSign";

const TraderSignPage = () => {
  // 상태 업데이트 함수
  const fetchStatementData = () => {
    customAxios.get(`/statement/worker/detail/${billId}`).then((res) => {
      const data = res.data.data;
      console.log(data)
      setStatementData(data);
      // 상태 업데이트 로직
      if (
        data.reqInfo.workerName === null &&
        data.resInfo.workerName === null
      ) {
        setStatus("WAITING");
      } else if (data.resInfo.workerName === null) {
        setStatus("PREPARING");
      } else {
        setStatus("READY");
      }
    });
  };

  const [statementData, setStatementData] = useState<StatementData | null>(
    null
  );
  const [status, setStatus] = useState<string>("");
  const { billId } = useParams<{ billId: string }>();
  const currentBranchSeq = useRecoilValue(UserInfoState).branchSeq;
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatementData();
    // 의존성 배열에 fetchStatementData를 포함하지 않아야 합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billId]);

  const renderButtons = () => {
    // "메인으로" 버튼을 렌더링해야 하는 조건을 확인합니다.
    const shouldShowMainButton =
      (statementData?.reqInfo?.workerName &&
        statementData?.resInfo?.workerName) || // 첫 번째 조건: 둘 다 null이 아닐 때
      (statementData?.reqInfo?.branchSeq === currentBranchSeq &&
        statementData?.reqInfo?.workerName); // 두 번째 조건

    if (shouldShowMainButton) {
      return (
        <TraderBtn size="Large" color="Blue" onClick={handleMainRedirect}>
          메인으로
        </TraderBtn>
      );
    } else if (
      statementData?.reqInfo?.workerName === null &&
      statementData?.resInfo?.workerName === null
    ) {
      // reqInfo와 resInfo가 모두 null일 때 "서명요청" 버튼을 렌더링합니다.
      return (
        <>
          <TraderBtn size="LargeL1" color="Grey" onClick={handleDelete}>
            삭제
          </TraderBtn>
          <TraderBtn size="LargeR2" color="Blue" onClick={handleRequestSign}>
            서명요청
          </TraderBtn>
        </>
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

  // 메인으로 이동 핸들러
  const handleMainRedirect = () => {
    navigate("/m/main");
  };

  // 서명요청 핸들러
  const handleRequestSign = async () => {
    const isAuth = await FIDOSign();

    const requestBody = {
      statementSeq: statementData?.statementSeq, // statementData가 유효한 경우 statementSeq 값을 사용
      type: "SELL", // 요청 본문에 들어가야 하는 type 값
    };

    if(isAuth === true) {
      customAxios
        .post("/statement/worker/sign", requestBody)
        .then((response) => {
          toast.success("서명요청을 보냈습니다.");
          fetchStatementData();
        })
        .catch((error) => {
          toast.error("서명요청에 실패했습니다.");
        });
      } else {
        toast.error("서명요청에 실패했습니다.");
      }
  };

  // 서명 응답 핸들러
  const handleResponseSign = async () => {
    const isAuth = await FIDOSign();

    const requestBody = {
      statementSeq: statementData?.statementSeq,
      type: "BUY",
    };

    if(isAuth === true) {
      customAxios
      .post("/statement/worker/sign", requestBody)
      .then((response) => {
        toast.success("서명을 완료했습니다.");
        fetchStatementData();
      })
      .catch((error) => {
        toast.error("서명에 실패했습니다.");
      });
    } else {
      toast.error("서명에 실패했습니다.");
    }
    
  };

  // 거절 핸들러
  const handleRefusal = () => {
    const requestBody = {
      statementSeq: statementData?.statementSeq,
    };

    customAxios
      .post("/statement/worker/refusal", requestBody)
      .then((response) => {
        toast.success("거절 되었습니다.");
        fetchStatementData();
      })
      .catch((error) => {
        toast.error("거절에 실패했습니다.");
      });
  };

  // 삭제 핸들러
  const handleDelete = () => {
    customAxios
      .delete(`/statement/worker/${billId}`)
      .then((response) => {
        toast.success("거래명세서가 삭제 되었습니다.");
        setTimeout(() => {
          navigate("/m/state/"); // 2초 후에 페이지 이동
        }, 2000); // 2000밀리초(2초) 대기
      })
      .catch((error) => {
        toast.error("삭제에 실패했습니다.");
      });
  };

  if (!statementData) return <Loader />;

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
  height: 100vh;
  margin-bottom: 60px;
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

const loaderAnimation = keyframes`
  0%, 100% {
    box-shadow: -10px -10px 0 5px,
                -10px -10px 0 5px,
                -10px -10px 0 5px,
                -10px -10px 0 5px;
  }
  8.33% {
    box-shadow: -10px -10px 0 5px,
                10px -10px 0 5px,
                10px -10px 0 5px,
                10px -10px 0 5px;
  }

    16.66% {
      box-shadow: -10px -10px 0 5px, 10px -10px 0 5px, 10px 10px 0 5px,
        10px 10px 0 5px;
    }
    24.99% {
      box-shadow: -10px -10px 0 5px, 10px -10px 0 5px, 10px 10px 0 5px,
        -10px 10px 0 5px;
    }
    33.32% {
      box-shadow: -10px -10px 0 5px, 10px -10px 0 5px, 10px 10px 0 5px,
        -10px -10px 0 5px;
    }
    41.65% {
      box-shadow: 10px -10px 0 5px, 10px -10px 0 5px, 10px 10px 0 5px,
        10px -10px 0 5px;
    }
    49.98% {
      box-shadow: 10px 10px 0 5px, 10px 10px 0 5px, 10px 10px 0 5px,
        10px 10px 0 5px;
    }
    58.31% {
      box-shadow: -10px 10px 0 5px, -10px 10px 0 5px, 10px 10px 0 5px,
        -10px 10px 0 5px;
    }
    66.64% {
      box-shadow: -10px -10px 0 5px, -10px -10px 0 5px, 10px 10px 0 5px,
        -10px 10px 0 5px;
    }
    74.97% {
      box-shadow: -10px -10px 0 5px, 10px -10px 0 5px, 10px 10px 0 5px,
        -10px 10px 0 5px;
    }
    83.3% {
      box-shadow: -10px -10px 0 5px, 10px 10px 0 5px, 10px 10px 0 5px,
        -10px 10px 0 5px;
    }
    91.63% {
      box-shadow: -10px -10px 0 5px, -10px 10px 0 5px, -10px 10px 0 5px,
        -10px 10px 0 5px;
    }
    100% {
      box-shadow: -10px -10px 0 5px, -10px -10px 0 5px, -10px -10px 0 5px,
        -10px -10px 0 5px;
    }
  
`;

const Loader = styled.span`
  height: 5px;
  width: 5px;
  color: #787878;
  box-shadow: -10px -10px 0 5px, -10px -10px 0 5px, -10px -10px 0 5px,
    -10px -10px 0 5px;
  animation: ${loaderAnimation} 6s infinite;

  /* 중앙 정렬을 위한 스타일 */
  position: fixed; /* 또는 absolute */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

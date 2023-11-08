import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderRoleDropdown from "../../components/atoms/trader/TraderRoleDropdown";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderStateFilter from "./../../components/molecules/trader/TraderStateFilter";
import TraderStateTable from "../../components/organisms/trader/TraderStateTable";
import { TraderStateTableProps } from "../../types/TraderTypes";
import { customAxios } from "../../components/api/customAxios";

const TraderStatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("전체");
  const [statementList, setStatementList] = useState<
    TraderStateTableProps["statementList"]
  >([]);
  const [filteredStatementList, setFilteredStatementList] = useState<
    TraderStateTableProps["statementList"]
  >([]);

  const handleMainButtonClick = () => {
    navigate("/m/main");
  };

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const checkToken = () => {
      const storedValue = localStorage.getItem("recoil-persist");
      const accessToken =
        storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;

      if (accessToken) {
        customAxios
          .get("/statement/worker/list/app")
          .then((res) => {
            const list = res.data.data.statementList;
            console.log(res);
            setStatementList(list);
            // 초기 렌더링에서는 모든 리스트를 보여줍니다.
            setFilteredStatementList(list);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } else {
        setTimeout(checkToken, 1000); // 1초마다 토큰 체크
      }
    };
    checkToken();
  }, [location]);

  useEffect(() => {
    // 선택된 역할에 따라 리스트를 필터링합니다.
    let filteredList = statementList.filter((item) => {
      // "전체" 선택 시 'PREPARING' 상태인 '수급' 항목을 제외합니다.
      const isPreparingRes =
        item.reqORres === 0 && item.statementStatus === "PREPARING";

      if (selectedRole === "전체") {
        return !isPreparingRes;
      } else if (selectedRole === "공급") {
        // '공급' 항목만 포함합니다.
        return item.reqORres === 1;
      } else if (selectedRole === "수급") {
        // '수급' 항목 중 'PREPARING' 상태가 아닌 것만 포함합니다.
        return item.reqORres === 0 && !isPreparingRes;
      }
      // 기본적으로 모든 항목을 포함합니다.
      return true;
    });

    setFilteredStatementList(filteredList);
  }, [selectedRole, statementList]);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 상태 조회" />
        <TraderRoleDropdown setSelectedRole={setSelectedRole} />
      </StyledHeader>

      <MainPaddingContainer>
        <StyledBody>
          <TraderStateFilter />
          {/* 필터링된 목록이 비어 있지 않다면 TraderStateTable 컴포넌트를 렌더링하고, 비어 있다면 메시지를 표시합니다. */}
          {filteredStatementList.length > 0 ? (
            <TraderStateTable
              selectedRole={selectedRole}
              statementList={filteredStatementList}
            />
          ) : (
            <StyledDiv>거래명세서가 존재하지 않습니다.</StyledDiv>
          )}
        </StyledBody>
      </MainPaddingContainer>

      <StyledFooter>
        <TraderBtn size="Large" color="Blue" onClick={handleMainButtonClick}>
          메인으로
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderStatePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 188px);
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
  background-color: #fff;
`;

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledDiv = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-weight: bold;
`;

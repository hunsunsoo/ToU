import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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
    customAxios
      .get("/statement/worker/list/app")
      .then((res) => {
        const list = res.data.data.statementList;
        console.log(list)
        setStatementList(list);
        // 초기 렌더링에서는 모든 리스트를 보여줍니다.
        setFilteredStatementList(list);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [location]);
  
  useEffect(() => {
    // 선택된 역할에 따라 리스트를 필터링합니다.
    let filteredList = [];
    if (selectedRole === "공급") {
      filteredList = statementList.filter((item) => item.reqORres === 0);
    } else if (selectedRole === "수급") {
      filteredList = statementList.filter((item) => item.reqORres === 1);
    } else {
      filteredList = statementList; // "전체"를 선택한 경우
    }
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
          {/* 필터링된 리스트를 TraderStateTable 컴포넌트로 전달합니다. */}
          <TraderStateTable
            selectedRole={selectedRole}
            statementList={filteredStatementList}
          />
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
  height: 100vh;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 188px);
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

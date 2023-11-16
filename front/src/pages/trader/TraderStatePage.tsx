import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpToLine } from "@fortawesome/sharp-light-svg-icons";

import TraderRoleDropdown from "../../components/atoms/trader/TraderRoleDropdown";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderStateFilter from "./../../components/molecules/trader/TraderStateFilter";
import TraderStateTable from "../../components/organisms/trader/TraderStateTable";
import { customAxios } from "../../components/api/customAxios";

interface Statement {
  reqORres: number;
  statementSeq: number;
  branchName: string;
  productName: string;
  tradeDate: string;
  statementStatus: string;
}

const TraderStatePage = () => {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState("전체");
  const [sortOption, setSortOption] = useState("latest");
  const [sortedStatementList, setSortedStatementList] = useState<Statement[]>(
    []
  );
  const [statementList, setStatementList] = useState<Statement[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 데이터를 불러오는 함수
  const fetchData = async (accessToken: string) => {
    try {
      const response = await customAxios.get("/statement/worker/list/app", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const list = response.data.data.statementList;
      setStatementList(list);
      setSortedStatementList(list);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // 토큰을 확인하고 데이터를 불러오는 함수
  const checkAndFetchData = async () => {
    const storedValue = localStorage.getItem("recoil-persist");
    let accessToken =
      storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;

    if (accessToken) {
      await fetchData(accessToken);
    }
  };

  useEffect(() => {
    checkAndFetchData();
  }, [location]);

  useEffect(() => {
    let filteredList = statementList.filter((item) => {
      const isPreparingRes =
        item.reqORres === 0 && item.statementStatus === "PREPARING";
      return selectedRole === "전체"
        ? !isPreparingRes
        : selectedRole === "공급"
        ? item.reqORres === 1
        : selectedRole === "수급"
        ? item.reqORres === 0 && !isPreparingRes
        : true;
    });

    // 정렬 로직
    filteredList.sort((a, b) =>
      sortOption === "latest"
        ? new Date(b.tradeDate).getTime() - new Date(a.tradeDate).getTime()
        : new Date(a.tradeDate).getTime() - new Date(b.tradeDate).getTime()
    );

    setSortedStatementList(filteredList);
  }, [selectedRole, statementList, sortOption]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 상태 조회" />
        <TraderRoleDropdown setSelectedRole={setSelectedRole} />
      </StyledHeader>

      <MainPaddingContainer>
        <StyledBody>
          <TraderStateFilter onSortChange={setSortOption} />
          {sortedStatementList.length > 0 ? (
            <TraderStateTable
              selectedRole={selectedRole}
              statementList={sortedStatementList}
            />
          ) : (
            <StyledDiv>거래명세서가 존재하지 않습니다.</StyledDiv>
          )}
        </StyledBody>
      </MainPaddingContainer>

      {showScrollButton && (
        <StyledScrollToTopButton onClick={scrollToTop}>
          <FontAwesomeIcon icon={faUpToLine} />
        </StyledScrollToTopButton>
      )}
    </StyledContainer>
  );
};

export default TraderStatePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 139.5px;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 12;
  background-color: #fff;
`;

const StyledDiv = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-weight: bold;
`;

const StyledScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #3e41ff;
  color: #ffffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
`;

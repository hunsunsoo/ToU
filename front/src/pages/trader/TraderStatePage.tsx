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
import { TraderStateTableProps } from "../../types/TraderTypes";
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

  useEffect(() => {
    const checkToken = () => {
      const storedValue = localStorage.getItem("recoil-persist");
      const accessToken =
        storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;

      if (accessToken) {
        customAxios
          .get("/statement/worker/list/app")
          .then((res) => {
            const list = res.data.data.statementList;
            setStatementList(list);
            setSortedStatementList(list); // 초기에는 정렬되지 않은 상태로 설정
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } else {
        setTimeout(checkToken, 1000);
      }
    };
    checkToken();
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

// const StyledFooter = styled.div`
//   position: fixed;
//   bottom: 0;
//   width: 100%;
// `;

const StyledDiv = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-weight: bold;
`;

// 맨 위로 스크롤하는 버튼의 스타일
const StyledScrollToTopButton = styled.button`
  position: fixed; // 버튼을 화면에 고정
  bottom: 20px; // 아래쪽에서 20px 떨어진 위치에
  right: 20px; // 오른쪽에서 20px 떨어진 위치에
  width: 2.5rem;
  height: 2.5rem;
  background-color: #3e41ff; // 배경색 설정
  color: #ffffffff; // 글자색 설정
  border: none; // 테두리 없음
  border-radius: 50%;
  cursor: pointer; // 커서 모양 변경
  z-index: 100; // z-index를 통해 다른 요소들 위에 오도록 설정
`;

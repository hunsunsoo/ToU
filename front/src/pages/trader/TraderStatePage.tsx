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

const TraderStatePage = () => {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState("전체");
  const [statementList, setStatementList] = useState<
    TraderStateTableProps["statementList"]
  >([]);
  const [filteredStatementList, setFilteredStatementList] = useState<
    TraderStateTableProps["statementList"]
  >([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤 효과
    });
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
        console.log(list);
        setStatementList(list);
        setFilteredStatementList(list);
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

  useEffect(() => {
    const handleScroll = () => {
      // 페이지의 스크롤 위치에 따라 버튼의 표시 여부를 결정
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      {/* 맨 위로 스크롤하는 버튼 추가 */}
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

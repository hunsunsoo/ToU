import React from "react";
import TraderStateDropdown from "../../atoms/trader/TraderStateDropdown";
import styled from "styled-components";
import TraderSignCheck from "../../atoms/trader/TraderSignCheck";

const TraderStateFilter = () => {
  const handleSortChange = (option: "latest" | "oldest") => {
    if (option === "latest") {
      // 최신순 정렬 로직
      console.log("최신순으로 정렬");
    } else {
      // 오래된순 정렬 로직
      console.log("오래된순으로 정렬");
    }
  };
  return (
    <StyledContainer>
      <TraderStateDropdown onSortChange={handleSortChange} />
      <TraderSignCheck label="서명 필요만 보기" />
    </StyledContainer>
  );
};

export default TraderStateFilter;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

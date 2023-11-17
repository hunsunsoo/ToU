import React from "react";
import styled from "styled-components";
import TraderStateDropdown from "../../atoms/trader/TraderStateDropdown";

interface TraderStateFilterProps {
  onSortChange: (option: "latest" | "oldest") => void;
}

const TraderStateFilter: React.FC<TraderStateFilterProps> = ({ onSortChange }) => {
  const handleSortChange = (option: "latest" | "oldest") => {
    onSortChange(option); // 상위 컴포넌트로 정렬 옵션 전달
  };

  return (
    <StyledContainer>
      <TraderStateDropdown onSortChange={handleSortChange} />
    </StyledContainer>
  );
};

export default TraderStateFilter;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

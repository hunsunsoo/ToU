import React, { useState, ChangeEvent } from "react"; // Import useState here
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/sharp-light-svg-icons";

interface TraderSearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

const TraderSearchBox: React.FC<TraderSearchBoxProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState(""); 

  // Add the type for the event parameter
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <StyledContainer>
      <SearchLabel>업체명</SearchLabel>
      <StyledDiv>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={inputValue}
          onChange={handleInputChange} // 입력이 변경될 때 마다 핸들러를 호출합니다.
        />
        <SearchButton onClick={() => onSearch(inputValue)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </StyledDiv>
    </StyledContainer>
  );
};

export default TraderSearchBox;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 25px 0 25px 0;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.8px solid #949494;
  width: 240px;
  height: 45px;
  border-radius: 10px;
`;

const SearchLabel = styled.span`
  /* font-size: 1.3rem;
  margin-right: 2rem; */
  font-size: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0px 12px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

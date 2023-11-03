import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/sharp-light-svg-icons";

const TraderItemSearchBox = () => {
  return (
    <StyledContainer>
      <SearchLabel>품목명</SearchLabel>
      <StyledDiv>
        <SearchInput placeholder=" 품목을 입력하세요" />
        <SearchButton>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </StyledDiv>
    </StyledContainer>
  );
};

export default TraderItemSearchBox;

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
  border: 1px solid #949494;
  width: 240px;
  height: 45px;
  border-radius: 10px;
`;

const SearchLabel = styled.span`
  /* font-size: 1.3rem;
  margin-right: 2rem; */
  margin-left: 10px;
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

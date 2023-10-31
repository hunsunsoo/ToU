import React from "react";
import styled from "styled-components";

const TraderSearchBox = () => {
  return (
    <StyledContainer>
      <SearchLabel>업체명</SearchLabel>
      <StyledDiv>
        <SearchInput placeholder="검색어를 입력하세요" />
        <SearchButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1rem"
            viewBox="0 0 512 512"
          >
            <path d="M400 208A192 192 0 1 0 16 208a192 192 0 1 0 384 0zM349.3 360.6C312.2 395 262.6 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 54.6-21 104.2-55.4 141.3l149 149c3.1 3.1 3.1 8.2 0 11.3s-8.2 3.1-11.3 0l-149-149z" />
          </svg>
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
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #949494;
  width: 240px;
  height: 48px;
  border-radius: 10px;
`;

const SearchLabel = styled.span`
  font-size: 1.3rem;
  margin-right: 2rem;
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

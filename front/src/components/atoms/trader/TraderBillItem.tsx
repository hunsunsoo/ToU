import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type TraderBillItemProps = {
  branchName: string;
  productsName: string;
  onClick?: () => void;
};

const TraderBillItem: React.FC<TraderBillItemProps> = ({
  branchName,
  productsName,
  onClick,
}) => {
  return (
    <StyledContainer onClick={onClick}>
      <StyledDiv>
        <BranchName>{branchName}</BranchName>
        <ProductName>{productsName}</ProductName>
      </StyledDiv>
      <FontAwesomeIcon icon={faChevronRight} />{" "}
    </StyledContainer>
  );
};

export default TraderBillItem;

const StyledContainer = styled.div`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center; // To align items vertically
  justify-content: space-between; // To place the icon on the far right
  flex-direction: row; // Change the direction to row to have icon on the side
  margin-bottom: 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BranchName = styled.span`
  font-weight: bold;
  font-size: 1.2rem; // branchName의 글자 크기를 더 크게 설정합니다.
  margin-bottom: 0.5rem; // productsName과의 간격을 조정합니다.
`;

const ProductName = styled.span`
  font-size: 1rem; // 기본 글자 크기를 유지합니다.
`;

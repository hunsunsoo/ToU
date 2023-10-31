import React from "react";
import styled from "styled-components";

type TraderBillItemProps = {
  itemText: string;
  onClick?: () => void;
};

const TraderBillItem: React.FC<TraderBillItemProps> = ({
  itemText,
  onClick,
}) => {
  return <StyledContainer onClick={onClick}>{itemText}</StyledContainer>;
};

export default TraderBillItem;

const StyledContainer = styled.div`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

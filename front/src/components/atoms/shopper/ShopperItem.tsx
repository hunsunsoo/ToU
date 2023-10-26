import React from "react";
import styled from "styled-components";

interface ShopperItemProps {
  content: string;
}

const ShopperItem: React.FC<ShopperItemProps> = ({ content }) => {
  return (
    <StyledDiv>
      <h3>{content}</h3>
    </StyledDiv>
  );
};

export default ShopperItem;

const StyledDiv = styled.div`
  background-color: white;
  width: 5rem;
  height: 5rem;
`;

import React from "react";
import styled from "styled-components";

interface ShopperItemProps {
  content: string;
}

const ShopperItem: React.FC<ShopperItemProps> = ({ content }) => {
  return (
    <StyledDiv>
      {content}
    </StyledDiv>
  );
};

export default ShopperItem;

const StyledDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
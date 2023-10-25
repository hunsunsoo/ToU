import React from "react";
import styled from "styled-components";

import {
  PRODUCTION,
  PROCESSING,
  DISTRIBUTION,
  SALES,
} from "../../../commons/String";

interface ShopperInfoCardProps {
  title: string;
}

const ShopperInfoDescription: React.FC<ShopperInfoCardProps> = ({ title }) => {
  let description;

  switch (title) {
    case "생산":
      description = PRODUCTION;
      break;
    case "가공":
      description = PROCESSING;
      break;
    case "유통":
      description = DISTRIBUTION;
      break;
    case "판매":
      description = SALES;
      break;
    default:
      description = "설명이 없습니다.";
      break;
  }

  return (
    <RightContainer>
      <StyledDescription>{description}</StyledDescription>
    </RightContainer>
  );
};

export default ShopperInfoDescription;

const RightContainer = styled.div`
  flex: 2;
  text-align: left;
`;

const StyledDescription = styled.span`
  font-size: 0.6rem;
`;

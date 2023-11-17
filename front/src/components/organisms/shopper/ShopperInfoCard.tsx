import React from "react";
import styled from "styled-components";
import ShopperInfoImageWithTitle from "../../atoms/shopper/ShopperInfoImageWithTitle";
import ShopperInfoDescription from "../../atoms/shopper/ShopperInfoDescription";

interface ShopperInfoCardProps {
  title: string;
}

const ShopperInfoCard: React.FC<ShopperInfoCardProps> = ({ title }) => {
  return (
    <CardContainer>
      <ShopperInfoImageWithTitle title={title} />
      <Divider />
      <ShopperInfoDescription title={title} />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  /* box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.1); */
  background-color: white;
  padding: 1rem;
  margin: 1rem 0 1rem 0;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  height: 100%;
  margin: 0 0.5rem;
`;

export default ShopperInfoCard;

import React from "react";
import styled from "styled-components";
import { Item } from "../../../types/ShopperTypes";

const ShopperItem = ({ title, image, content }: Item) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledImg src={image} />
      <StyledContent>{content}</StyledContent> 
    </StyledContainer>
  );
};

export default ShopperItem;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-right: 1rem;
`;

const StyledTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

const StyledContent = styled.div`
  text-align: center;
`;

const StyledImg = styled.img`
  width: 5rem;
  height: auto;
  margin-bottom: 1rem;
`;

// const StyledContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: #fff;
//   /* margin: 20px; */
//   /* padding: 10px; */
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//   transition: 0.3s;
//   border-radius: 5px; // 경계선 둥글기
// `;

// const StyledTitle = styled.h2`
//   font-size: 1.5em;
//   color: #333;
// `;

// const StyledImg = styled.img`
//   width: 100%; // 이미지 너비를 조정하려면 이 값을 조절하세요
//   height: auto; // 이미지 높이는 자동으로 조정
//   margin-bottom: 20px;
// `;

// const StyledContent = styled.div`
//   text-align: center;
//   color: #666;
// `;

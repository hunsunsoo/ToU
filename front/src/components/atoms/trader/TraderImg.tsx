import React from "react";
import styled from "styled-components";

const TraderImg = () => {
  return <StyledImg src="/profileImage.png" alt="프로필" />;
};

export default TraderImg;

const StyledImg = styled.img`
    border-radius: 50%;
    width: 4rem;
    height: auto;
    margin: 1rem 0;
`
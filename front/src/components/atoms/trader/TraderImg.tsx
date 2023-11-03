import React from "react";
import styled from "styled-components";

interface TraderImgProps {
  logoImage?: string;
}

const TraderImg: React.FC<TraderImgProps> = ({ logoImage }) => {
  return <StyledImg src={logoImage || "/profileImage.png"} alt="프로필" />;
};


export default TraderImg;

const StyledImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: auto;
  margin: 1rem 0;
`;

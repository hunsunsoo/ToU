import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TraderBtn from "../../atoms/trader/TraderBtn";
import {AiOutlineRight} from "react-icons/ai";


type TraderMainBtnProps = {
  route: string;
  iconSrc: string;
  altText: string;
  children: React.ReactNode;
};

const TraderMainBtn: React.FC<TraderMainBtnProps> = ({
  route,
  iconSrc,
  altText,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <TraderBtn
      size="Main"
      color="White"
      onClick={() => {
        navigate(route);
      }}
    >
      <ButtonContent>
        <StyledImage src={iconSrc} alt={altText} />
        <StyledChildren>{children}</StyledChildren>
        <StyledIcon><AiOutlineRight size = "20" color="#868686"/></StyledIcon>
      </ButtonContent>
    </TraderBtn>
  );
};

export default TraderMainBtn;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  font-size: 1.4rem;
  /* font-weight: bold; */

`;

const StyledImage = styled.img`
  width: 3.5rem;
  height: auto;
  margin-right: auto;
`;

const StyledChildren = styled.div`
  flex: 2;
  text-align: left; 
  padding: 0 1rem;
`;

const StyledIcon = styled.div`
  margin-left: auto; 
`;
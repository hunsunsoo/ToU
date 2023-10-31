import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TraderBtn from "../../atoms/trader/TraderBtn";

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
        {children}
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
  font-size: 1.2rem;
  /* font-weight: bold; */
`;

const StyledImage = styled.img`
  width: 3rem;
  height: auto;
`;

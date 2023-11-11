import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type TraderMainBtnProps = {
  route: string;
  iconSrc: string;
  altText: string;
  color: string;
  children: React.ReactNode;
  size?: string;
};

const TraderMainBtn: React.FC<TraderMainBtnProps> = ({
  route,
  iconSrc,
  altText,
  children,
  color,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <ButtonContent onClick={handleClick} color={color}> {/* Add onClick event here */}
      <StyledChildren>{children}</StyledChildren>
      <StyledImage src={iconSrc} alt={altText} />
    </ButtonContent>
  );
};

export default TraderMainBtn;

const ButtonContent = styled.div`
  background-color: ${(props) => props.color || "#668bfe"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  height: 100%;
  width: 10rem;
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: 0.5rem;
`;

const StyledChildren = styled.div`
  color: #fff;
`;

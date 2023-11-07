import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineHome } from "react-icons/ai";
import styled from "styled-components";

interface TraderHeaderProps {
  title: string;
}

const TraderHeader = (props: TraderHeaderProps) => {
  const navigate = useNavigate();

  let title = props.title;

  return (
    <StyledHeader>
      <BackIcon>
        <AiOutlineLeft
          size="30"
          onClick={() => {
            navigate(-1);
          }}
        />
      </BackIcon>
      <StyledTitle>{title}</StyledTitle>
      <HomeIcon>
        <AiOutlineHome
          size="30"
          onClick={() => {
            navigate("/m/main");
          }}
        />
      </HomeIcon>
    </StyledHeader>
  );
};

export default TraderHeader;

const StyledHeader = styled.div`
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  background-color: #fff;
  padding: 0.5rem 0;
`;

const BackIcon = styled.div`
  margin-left: 20px;
`;

const StyledTitle = styled.div`
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const HomeIcon = styled.div`
  margin-right: 20px;
`;

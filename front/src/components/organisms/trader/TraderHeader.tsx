import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineHome } from "react-icons/ai";
import styled from "styled-components"


// import style from "./TreaderHeader.module.css"

interface TraderHeaderProps {
    title: string;
}

const TraderHeader = (props: TraderHeaderProps) => {
  const navigate = useNavigate();

  let title = props.title;

  return (
    <StyledHeader>
        <BackIcon>
            <AiOutlineLeft size = "30" onClick={() => { navigate(-1) }}/>
        </BackIcon>
        <StyledTitle>
            <p>{title}</p>
        </StyledTitle>
        <HomeIcon>
            <AiOutlineHome size = "30" onClick={() => {navigate('/m/main')}}/>
        </HomeIcon>
    </StyledHeader>
  )
};

export default TraderHeader;

const StyledHeader = styled.div`
    height: 7vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-top: 4%; */
    border-bottom: 1px solid #000000;
    background-color: #fff;
    /* position: fixed; */
`;

const BackIcon = styled.div`
    margin-left: 20px;
`

const StyledTitle = styled.div`
    text-align: center;
    width: 100%;
    font-size: 26px;
    font-weight: bold;
    margin: 0 0 0 0;
`

const HomeIcon = styled.div`
    margin-right: 20px;
`
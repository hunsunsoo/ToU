import React from "react";
import styled from 'styled-components';

interface TitleProps {
  children: React.ReactNode;
}

const OfficerTitle: React.FC<TitleProps> = ({children}) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default OfficerTitle;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 5px; */
  font-size: 22px;
`
import React, { ReactNode } from "react";
import styled from 'styled-components';

interface TitleProps {
  children: React.ReactNode;
}

const OfficerTitle: React.FC<TitleProps> = ({children}) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default OfficerTitle;

const StyledTitle = styled.p`
  margin-top: 5px;
  font-size: 22px;
`
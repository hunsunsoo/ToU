import React from 'react'
import styled from "styled-components";
import TraderDropdown from '../../atoms/trader/TraderDropdown';

interface TraderUnitInputTitleProps {
  inputTitle: string;
}

const TraderDropdownTitle = ({ inputTitle, ...props }: TraderUnitInputTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderDropdown {...props} />
    </Container>
  );
};

export default TraderDropdownTitle;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 30px 0 30px 0;
`;

const InputTitle = styled.span`
    margin-left: 10px;
    font-size: 20px;
`;
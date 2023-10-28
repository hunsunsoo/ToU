import React from 'react'
import styled from "styled-components";
import TraderUnitInputBox from '../../molecules/trader/TraderUnitInputBox';

interface TraderUnitInputTitleProps {
  inputTitle: string;
}

const TraderUnitInputTitle = ({ inputTitle, ...props }: TraderUnitInputTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderUnitInputBox {...props} />
    </Container>
  );
};

export default TraderUnitInputTitle;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const InputTitle = styled.span`
    margin-left: 10px;
    font-size: 20px;
`;
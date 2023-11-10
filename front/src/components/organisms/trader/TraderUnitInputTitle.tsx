import React from 'react'
import styled from "styled-components";
import TraderUnitInputBox from '../../molecules/trader/TraderUnitInputBox';

interface TraderUnitInputTitleProps {
  inputTitle: string;
  value: string;
  selectedUnit: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TraderUnitInputTitle = ({inputTitle, value, onChange, ...props }: TraderUnitInputTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderUnitInputBox value={value} onChange={onChange} {...props} />
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
    margin: 20px 0 20px 0;
`;

const InputTitle = styled.span`
    margin-left: 10px;
    font-size: 20px;
`;
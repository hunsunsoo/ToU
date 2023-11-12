import React from 'react';
import styled from 'styled-components';

interface StepIndicatorProps {
  steps: number;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <Stepper>
      {Array.from({ length: steps }, (_, index) => (
        <React.Fragment key={index}>
          <Step active={index + 1 === currentStep}>
            <StepNumber active={index + 1 === currentStep}>{index + 1}</StepNumber>
          </Step>
          {index < steps - 1 && (
            <>
              <SmallDot />
              <SmallDot />
            </>
          )}
        </React.Fragment>
      ))}
    </Stepper>
  );
};

export default StepIndicator;

// Styled components
const Stepper = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Step = styled.div<{ active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#4795ff' : 'transparent')};
  border: 0.5px solid ${({ active }) => (active ? '#4795ff' : '#949494')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;

  &:not(:last-child)::after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: grey;
    position: absolute;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StepNumber = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? 'white' : 'black')};
  font-weight: bold;
`;

const SmallDot = styled.div`
  width: 0.5rem; // 작은 동그라미의 크기를 설정
  height: 0.5rem; // 작은 동그라미의 크기를 설정
  border-radius: 50%;
  background-color: #cccccc; // 회색 배경
  margin: 0 0.3rem; // 큰 동그라미와 작은 동그라미 사이의 간격
`;


import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";

interface CheckboxProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const TraderSignCheck: React.FC<CheckboxProps> = ({
  label,
  defaultChecked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleCheckboxChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  const Icon = isChecked ? AiFillCheckCircle : AiOutlineCheckCircle;

  return (
    <LabelWrapper onClick={handleCheckboxChange}>
      <StyledIcon as={Icon} />
      {label}
    </LabelWrapper>
  );
};

export default TraderSignCheck;

const LabelWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none; 
`;

const StyledIcon = styled.span`
  margin-right: 0.3rem;
  display: inline-block;
`;

// 사용 예시
// <TraderSignCheck label="서명 필요만 보기" />
// <TraderSignCheck label="내 담당 명세만 보기" />

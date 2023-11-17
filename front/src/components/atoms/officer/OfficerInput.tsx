import React from "react";
import styled from "styled-components";

interface InputProps {
  size: InputSize;
  isDisabled?: boolean;
  color?: InputColor;
  placeholder?: string;
  type?: "text" | "number";
  value?: string | number | null;
  // onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

type InputSize = "X-Large" | "Large" | "Medium" | "Small" | "underwriter" | "underwriter2" | "underwriter3";

type InputStyle = {
  height: string;
  width: string;
  fontSize: string;
  borderRadius?: string;
};

type InputColor = "BlackStroke";

type InputColorStyle = {
  border: string;
  backgroundColor: string;
  color: string;
  placeholderColor: string;
  boxShadow: string;
};

const InputStyles: Record<InputSize, InputStyle> = {
  "X-Large": {
    height: "120px",
    width: "250px",
    fontSize: "16px",
    borderRadius: "6px",
  },
  Large: {
    height: "35px",
    width: "250px",
    fontSize: "16px",
    borderRadius: "6px",
  },
  Medium: {
    height: "35px",
    width: "200px",
    fontSize: "16px",
    borderRadius: "",
  },
  Small: {
    height: "35px",
    width: "150px",
    fontSize: "16px",
    borderRadius: "6px",
  },
  underwriter: {
    height: "35px",
    width: "350px",
    fontSize: "16px",
    borderRadius: "0px",
  },
  underwriter2: {
    height: "35px",
    width: "200px",
    fontSize: "16px",
    borderRadius: "0px",
  },
  underwriter3: {
    height: "35px",
    width: "140px",
    fontSize: "16px",
    borderRadius: "0px",
  },
};

const InputColors: Record<InputColor, InputColorStyle> = {
  BlackStroke: {
    border: "1px solid #000",
    backgroundColor: "transparent",
    color: "#000",
    placeholderColor: "#797979",
    boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.70)",
  },
};

const StyledInput = styled.input<InputProps>`
  width: ${(props) => InputStyles[props.size].width};
  height: ${(props) => InputStyles[props.size].height};
  font-size: ${(props) => InputStyles[props.size].fontSize};
  border-radius: ${(props) => InputStyles[props.size]?.borderRadius ?? "12px"};
  box-sizing: border-box;
  padding: 0 8px;
  border: ${(props) => InputColors[props.color || "BlackStroke"].border};
  background-color: ${(props) =>
    InputColors[props.color || "BlackStroke"].backgroundColor};
  color: ${(props) => InputColors[props.color || "BlackStroke"].color};
  margin-right: 10px;
  ${(props) => props.isDisabled && `disabled: true;`}


  &::placeholder {
    color: ${(props) =>
      InputColors[props.color || "BlackStroke"].placeholderColor};
  }

  &:focus {
    outline: none;
    box-shadow: ${(props) =>
      InputColors[props.color || "BlackStroke"].boxShadow};
  }

  
`;

const OfficerInput = ({ value, onChange,...props }: InputProps) => {
  return <StyledInput value={value} onChange={onChange} {...props} />;
};

export default OfficerInput;


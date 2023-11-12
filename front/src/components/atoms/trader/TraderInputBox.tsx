import React from "react";
import styled from "styled-components";

interface InputProps {
  size: InputSize;
  color?: InputColor;
  placeholder?: string;
  type?: "text" | "number";
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

type InputSize = "X-Large" | "Large" | "Medium" | "Small";

type InputStyle = {
  height: string;
  width: string;
  fontSize: string;
  borderRadius?: string;
};

type InputColor = "BlackStroke" | "Grey";

type InputColorStyle = {
  border: string;
  backgroundColor: string;
  color: string;
  placeholderColor: string;
  boxShadow: string;
};

const InputStyles: Record<InputSize, InputStyle> = {
  "X-Large": {
    height: "7.5rem",
    width: "20rem",
    fontSize: "1rem",
    borderRadius: "",
  },
  Large: {
    height: "2.813rem",
    width: "20rem",
    fontSize: "1rem",
    borderRadius: "",
  },
  Medium: {
    height: "2.813rem",
    width: "200px",
    fontSize: "16px",
    borderRadius: "10px",
  },
  Small: {
    height: "2.813rem",
    width: "13rem",
    fontSize: "1rem",
    borderRadius: "",
  },
};

const InputColors: Record<InputColor, InputColorStyle> = {
  BlackStroke: {
    border: "0.8px solid var(--festie-gray-600, #949494)",
    backgroundColor: "transparent",
    color: "#000",
    placeholderColor: "#797979",
    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.70)",
  },
  Grey:{
    border: "transparent",
    backgroundColor: "#F3F4F5",
    color: "#000",
    placeholderColor: "#797979",
    boxShadow: "",
  }
};

const StyledInput = styled.input<InputProps>`
  width: ${(props) => InputStyles[props.size].width};
  height: ${(props) => InputStyles[props.size].height};
  font-size: ${(props) => InputStyles[props.size].fontSize};
  border-radius: ${(props) => InputStyles[props.size]?.borderRadius ?? "12px"};
  box-sizing: border-box;
  padding: 0 8px;
  border: ${(props) => InputColors[props.color || "Grey"].border};
  background-color: ${(props) =>
    InputColors[props.color || "Grey"].backgroundColor};
  color: ${(props) => InputColors[props.color || "Grey"].color};
  /* margin-right: 10px; */

  &::placeholder {
    color: ${(props) =>
      InputColors[props.color || "Grey"].placeholderColor};
  }
  
  &:focus {
    outline: none;
    box-shadow: ${(props) =>
      InputColors[props.color || "BlackStroke"].boxShadow};
  }
  ${(props) => props.disabled && `
    font-size: 16px;
    cursor: not-allowed;
    background-color: #f2f2f2;
  `}

`;

const TraderInputBox = ({ ...props }: InputProps) => {
  return <StyledInput {...props} />;
};

export default TraderInputBox;

// placeholder
// type
// value
// onClick
// onKeyPress
// color
// size

//인풋박스
/* <TraderInputBox size="X-Large" color="BlackStroke"></TraderInputBox>
<TraderInputBox size="Large" color="BlackStroke"></TraderInputBox>
<TraderInputBox size="Medium" color="BlackStroke"></TraderInputBox>
<TraderInputBox size="Small" color="BlackStroke"></TraderInputBox> */

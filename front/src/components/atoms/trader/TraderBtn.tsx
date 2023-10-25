import React, { ReactNode } from "react";
import { styled } from "styled-components";

interface ButtonProps {
  size: ButtonSize;
  color: ButtonColor;
  onClick?: () => void;
  children: ReactNode;
}

type ButtonSize = "X-Large" | "Large" | "LargeR2" | "LargeL1" | "Medium" | "Small";

type ButtonColor = "Blue" | "Grey" | "White" | "Sky";

//사이즈, 마진, 폰트
type ButtonStyle = {
  height: string;
  width: string;
  weight: string;
  fontSize: string;
  borderRadius?: string;
};

//컬러(배경, 폰트, 그림자, 보더)
type ButtonColorStyle = {
  backgroundColor: string;
  border?: string;
  boxShadow?: string;
  color?: string;
};

const ButtonStyles: Record<ButtonSize, ButtonStyle> = {
  "X-Large": {
    height: "220px",
    width:"180px",
    weight: "Bold",
    fontSize: "24px",
    // borderRadius: "",
  },
  Large: {
    height: "60px",
    width:"100%",
    weight: "",
    fontSize: "24px",
    borderRadius: "",
  },
  LargeR2: {
    height: "60px",
    width:"65%",
    weight: "",
    fontSize: "24px",
    borderRadius: "",
  },
  LargeL1: {
    height: "60px",
    width:"35%",
    weight: "",
    fontSize: "24px",
    borderRadius: "",
  },
  Medium: {
    height: "44px",
    width:"60px",
    weight: "",
    fontSize: "16px",
    borderRadius: "",
  },
  Small: {
    height: "40px",
    width:"60px",
    weight: "",
    fontSize: "16px",
    borderRadius: "10px",
  },
};

const ButtonColors: Record<ButtonColor, ButtonColorStyle> = {
  Blue: {
    backgroundColor: "#3479FF",
    color: "#FFFFFF",
  },
  Grey: {
    backgroundColor: "#CACACA",
    color: "#FFFFFF",
  },
  White: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "1px solid #000",
    boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
  },
  Sky: {
    backgroundColor: "#EAF6FF",
    color: "#000000",
    boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.25)",
  },
};

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => ButtonStyles[props.size].width};
  height: ${(props) => ButtonStyles[props.size].height};
  font-size: ${(props) => ButtonStyles[props.size].fontSize};
  border-radius: ${(props) => ButtonStyles[props.size]?.borderRadius ?? "12px"};
  background-color: ${(props) => ButtonColors[props.color].backgroundColor};
  border: ${(props) => ButtonColors[props.color]?.border ?? "none"};
  color: ${(props) => ButtonColors[props.color]?.color ?? "#000"};
  cursor: pointer;
`;

const TraderBtn = ({ size, color, onClick, children }: ButtonProps) => {
  return (
    <StyledButton size={size} color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default TraderBtn;

//버튼 모음
{/* <div>
<TraderBtn size="Large" color="Blue">
    다음
</TraderBtn>
<TraderBtn size="Large" color="Grey">
    명세서 생성
</TraderBtn>
<TraderBtn size="X-Large" color="Sky">
    거래 명세서<br/> 불러오기
</TraderBtn>
<TraderBtn size="LargeR2" color="Blue">
    서명
</TraderBtn>
<TraderBtn size="LargeL1" color="Grey">
    거절
</TraderBtn>
<TraderBtn size="Medium" color="Blue">
    수정
</TraderBtn>
<TraderBtn size="Medium" color="Grey">
    삭제
</TraderBtn>
<TraderBtn size="Small" color="White">
    저장
</TraderBtn>
</div> */}
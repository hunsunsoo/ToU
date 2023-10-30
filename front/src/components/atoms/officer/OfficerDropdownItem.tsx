import React from "react";
import styled from "styled-components";

// DropdownItem 컴포넌트 props 타입 정의
interface DropdownItemProps {
  label: string;
  value: string;
  theme?: ThemeType; // theme prop 추가
  onClick?: () => void;
}

type ThemeType = "light" | "dark";

type DropdownItemThemeStyle = {
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
};

const DROPDOWN_ITEM_THEME_STYLES: Record<ThemeType, DropdownItemThemeStyle> = {
  light: {
    backgroundColor: "#fff",
    textColor: "Black",
    hoverBackgroundColor: "#ccc",
  },
  dark: {
    backgroundColor: "#333",
    textColor: "White",
    hoverBackgroundColor: "#666",
  },
};

const OfficerDropdownItem: React.FC<DropdownItemProps> = ({
  label,
  value,
  theme = "light", // <-- default theme 지정
  onClick,
}) => {
  return (
    <StyledItem onClick={onClick} theme={theme}>
      {label}
    </StyledItem>
  );
};

export default OfficerDropdownItem;

const StyledItem = styled.div<{ theme: ThemeType }>`
  // <-- theme prop 추가
  width: 100%;
  border-radius: 12px;
  height: 44px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    DROPDOWN_ITEM_THEME_STYLES[theme].backgroundColor};
  color: ${({ theme }: { theme: ThemeType }) =>
    DROPDOWN_ITEM_THEME_STYLES[theme].textColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }: { theme: ThemeType }) =>
      DROPDOWN_ITEM_THEME_STYLES[theme].hoverBackgroundColor};
  }
`;

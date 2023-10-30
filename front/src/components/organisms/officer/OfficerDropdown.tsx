import React, { useState, useRef, useEffect } from "react";
import DropdownItem from "../../atoms/officer/OfficerDropdownItem";
import styled from "styled-components";

// 드롭다운에서 사용할 옵션 타입
export interface OptionType {
  label: string;
  value: string;
}

// Dropdown 컴포넌트 테마 타입 정의
type ThemeType = "light" | "dark";

interface DropdownProps {
  options: OptionType[];
  onSelectedChange?: (selected: OptionType) => void;
  theme?: ThemeType;
}

// 드롭다운의 테마 스타일 타입 정의
type DropdownThemeStyle = {
  backgroundColor: string;
};

// 두 가지 테마에 대한 스타일 값 정의
const DROPDOWN_THEME_STYLES: Record<ThemeType, DropdownThemeStyle> = {
  light: {
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#333",
  },
};

const OfficerDropdown: React.FC<DropdownProps> = ({
  options,
  onSelectedChange,
  theme = "light",
}) => {
  // 드롭다운이 열려있는지 여부, 현재 선택된 옵션 상태관리
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭을 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // 드롭다운 아이템 클릭 시의 동작
  const handleItemClick = (option: OptionType) => {
    setSelected(option);
    onSelectedChange?.(option); // 선택된 아이템을 부모에게 알림 (optional chaining 사용)
    setOpen(false);
  };

  return (
    <StyledDropdown
      theme={theme}
      onClick={() => setOpen(!open)}
      ref={dropdownRef}
    >
    </StyledDropdown>
  );
};

export default OfficerDropdown;

const StyledDropdown = styled.div<{ theme: ThemeType }>`
  position: relative;
  width: 96px;
  height: 44px;
  border-radius: 12px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    DROPDOWN_THEME_STYLES[theme].backgroundColor};
  cursor: pointer;
`;

const OptionsContainer = styled.div<{ theme: ThemeType }>`
  position: absolute; // 옵션을 절대적 위치로 지정
  top: 100%; // 드롭다운 텍스트 바로 아래에 위치
  left: 0; // 왼쪽 정렬
  width: 100%; // 부모 컴포넌트와 동일한 너비
  border-radius: 12px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    DROPDOWN_THEME_STYLES[theme].backgroundColor};
  z-index: 1; // 다른 컴포넌트 위에 옵션 표시
`;

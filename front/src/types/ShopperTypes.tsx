// DotsProps 타입 정의
export type DotsProps = {
    number: number;
    selectedIndex: number;
    onThumbClick: (index: number) => void;
  };
  
  // DotButtonProps 타입 정의
  export type DotButtonProps = {
    selected: boolean;
    onClick: () => void;
  };
  
  // 데이터 타입 정의
  export interface Item {
    id?: number;
    title: string;
    image: string;
    content: string;
  }
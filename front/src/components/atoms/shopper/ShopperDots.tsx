import styled from "styled-components";
import { DotsProps } from "../../../types/ShopperTypes";
import { DotButtonProps } from "../../../types/ShopperTypes";

// 새로운 Dots 컴포넌트를 정의합니다.
const Dots: React.FC<DotsProps> = ({ number, selectedIndex, onThumbClick }) => {
    let dots = [];
    for (let i = 0; i < number; i++) {
      dots.push(
        <DotButton
          key={i}
          selected={selectedIndex === i}
          onClick={() => onThumbClick(i)}
        />
      );
    }
    return <DotsContainer>{dots}</DotsContainer>;
  };

  export default Dots

  // 새롭게 도트 컴포넌트에 대한 스타일을 추가합니다.
const DotsContainer = styled.div`
display: flex;
justify-content: center;
`;

const DotButton = styled.button<DotButtonProps>`
background-color: ${({ selected }) => (selected ? "#3CAAFF" : "white")};
border: none;
width: 10px;
height: 10px;
border-radius: 50%;
margin: 1rem 0.5rem;
padding: 0;
&:hover {
  cursor: pointer;
}
`;

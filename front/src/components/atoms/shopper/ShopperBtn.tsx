import styled from "styled-components";

interface ButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
  isLogo?: boolean;
}

const ShopperBtn: React.FC<ButtonProps> = ({
  src,
  alt,
  onClick,
  isLogo = false,
}) => {
  return <StyledButton src={src} alt={alt} onClick={onClick} />;
};

export default ShopperBtn;

const StyledButton = styled.img<{ isLogo?: boolean }>`
  cursor: pointer;
  height: ${({ isLogo }) => (isLogo ? "1.2rem" : "1.5rem")};
  width: auto;
`;

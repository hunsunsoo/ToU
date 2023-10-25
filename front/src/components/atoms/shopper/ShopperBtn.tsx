import styled from 'styled-components';

interface ButtonProps {
    src: string;
    alt: string;
    onClick?: () => void;
    isLogo?: boolean;
}

const StyledButton = styled.img<ButtonProps>`
    cursor: pointer;
    height: ${({ isLogo }) => (isLogo ? '1.2rem' : '25px')};
    width: ${({ isLogo }) => (isLogo ? 'auto' : '25px')}; 
`;

const ShopperBtn: React.FC<ButtonProps> = ({ src, alt, onClick, isLogo = false }) => {
    return <StyledButton src={src} alt={alt} onClick={onClick} isLogo={isLogo} />;
};

export default ShopperBtn;

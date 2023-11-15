import React, { ReactNode } from "react";
import styled from 'styled-components';

interface ButtonProps {
    isImg?: boolean;
    src?: string;
    alt?: string;
    isLarge?: boolean;
    isActive?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

const OfficerBtn: React.FC<ButtonProps> = ({ isImg, src, alt, isLarge, isActive, onClick, children }) => {
    if (isImg) {
        return <StyledButtonImg isImg={isImg} src={src} alt={alt} onClick={onClick} />;
    } else {
        if (isLarge) {
            return <StyledButtonLarge isImg={isImg} onClick={onClick}>{children}</StyledButtonLarge>;
        } else {
            if (isActive) {
                return <StyledButtonAct isImg={isImg} onClick={onClick}>{children}</StyledButtonAct>;
            } else {
                return <StyledButtonInAct isImg={isImg} onClick={onClick}>{children}</StyledButtonInAct>;
            }
        }
    }
};

export default OfficerBtn;

const StyledButtonImg = styled.img<ButtonProps>`
    cursor: pointer;
    width: 48px;
`;

const StyledButtonLarge = styled.div<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    height: 40px;
    width: 150px;
    font-size: 20px;
    color: #fff;
    border-radius: 15px;
    background-color: #404DCD;
`;

const StyledButtonAct = styled.div<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    height: 40px;
    width: 100px;
    font-size: 18px;
    color: #fff;
    background-color: #404DCD;
`;

const StyledButtonInAct = styled.div<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    height: 40px;
    width: 100px;
    font-size: 18px;
    color: #fff;
    background-color: #CACACA;
`;



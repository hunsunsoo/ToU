import React from 'react';
import styled from "styled-components"

interface TraderInfoTitleProps {
    infoTitle: string;
}

const TraderInfoTitle = ({infoTitle}:TraderInfoTitleProps) => {
    return (
        <StyledInfoHeader>
            <>{infoTitle}</>
        </StyledInfoHeader>
    );
};

export default TraderInfoTitle;

const StyledInfoHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    height: 4vh;
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #000000;
`;
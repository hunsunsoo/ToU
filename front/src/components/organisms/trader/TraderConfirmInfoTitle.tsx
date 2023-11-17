import React from 'react';
import styled from "styled-components"

interface TraderConfirmInfoTitleProps {
    infoTitle: string;
}

const TraderConfirmInfoTitle = ({infoTitle}:TraderConfirmInfoTitleProps) => {
    return (
        <StyledInfoHeader>
            <>{infoTitle}</>
        </StyledInfoHeader>
    );
};

export default TraderConfirmInfoTitle;

const StyledInfoHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    height: 4vh;
    width: 100%;
    display: flex;
    align-items: center;
    /* padding-bottom: px; */
    border-bottom: 1px solid var(--festie-gray-600, #949494);

`;
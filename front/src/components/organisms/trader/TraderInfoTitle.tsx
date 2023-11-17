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
    font-size: 24px;
    font-weight: bold;
    height: 7rem;
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    /* padding-bottom: px; */
    border-bottom: 1px solid var(--festie-gray-600, #949494);
    justify-content: center;
    align-items: center;
    text-align: center;
`;
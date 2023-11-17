import React from 'react';
import styled from 'styled-components';

type TraderBranchProps = {
  companyName: string;
  branchName: string;
};

const TraderBranch: React.FC<TraderBranchProps> = ({ companyName, branchName }) => {
    return (
        <StyledDiv>
            {companyName} {branchName}
        </StyledDiv>
    );
};

export default TraderBranch;

const StyledDiv = styled.div`
    font-size: 1.2rem;
`
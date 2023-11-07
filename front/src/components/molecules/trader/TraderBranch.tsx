import React from 'react';

type TraderBranchProps = {
  companyName: string;
  branchName: string;
};

const TraderBranch: React.FC<TraderBranchProps> = ({ companyName, branchName }) => {
    return (
        <div>
            {companyName} {branchName}
        </div>
    );
};

export default TraderBranch;

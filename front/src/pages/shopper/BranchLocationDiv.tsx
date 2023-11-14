// BranchLocationComponent.tsx
import React from "react";
import styled from "styled-components";

const BranchLocationDiv = styled.div`
  background-color: yellow;
`;

type BranchLocationComponentProps = {
  location: string;
};

const BranchLocationComponent: React.FC<BranchLocationComponentProps> = ({ location }) => (
  <BranchLocationDiv>{location}</BranchLocationDiv>
);

export default BranchLocationComponent;

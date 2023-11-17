import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledDiv>
      404 NotFound
    </StyledDiv>
  );
}

export default NotFound;

const StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;

`
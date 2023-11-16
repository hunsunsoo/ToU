import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customAxios } from '../../api/customAxios';




const TraderMainCount = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  console.log(count1);

  useEffect(() => {
    const storedValue = localStorage.getItem("recoil-persist");
    const accessToken =
      storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;

    if (accessToken) {
      customAxios.get(`/statement/worker/list/app/count`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setCount1(res.data.data.preparingCount);
        setCount2(res.data.data.watingCount);
        setCount3(res.data.data.refusalCount);
      });
    }
  }, []);

  return (
    <StyledContainer>
      <StyledItem>서명 필요 <StyledCount>{count1} 건</StyledCount></StyledItem>
      <StyledDivider />
      <StyledItem>서명 대기중 <StyledCount>{count2} 건</StyledCount></StyledItem>
      <StyledDivider />
      <StyledItem>거절 문서 <StyledCount>{count3} 건</StyledCount></StyledItem>
    </StyledContainer>
  );
};

export default TraderMainCount;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(70deg, #6D8BF5 11.08%, #5FA8FF 86.68%);
  color: #fff;
  height: 5rem;
  border-radius: 16px;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledDivider = styled.div`
  height: 3rem;
  width: 1px;
  background-color: #fff;
  opacity: 0.5;
`;

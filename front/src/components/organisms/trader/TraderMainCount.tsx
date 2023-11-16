import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customAxios } from '../../api/customAxios';




const TraderMainCount = () => {
  const [count1, setCount1] = useState();
  const [count2, setCount2] = useState();
  const [count3, setCount3] = useState();


  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const awaitToken = async () => {
      return new Promise((resolve) => {
        const checkToken = () => {
          const storedValue = localStorage.getItem("recoil-persist");
          const accessToken = storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;
          
          if (accessToken) {
            resolve(accessToken);
          } else {
            setTimeout(checkToken, 1000); // 1초마다 토큰 체크
          }
        };
        checkToken();
      });
    };

    // statementCount 가져오기
    const awaitCount = async () => {
      try {
        const accessToken = await awaitToken();
        if (!accessToken) {
          return;
        }

        const res = await customAxios.get(`/statement/worker/list/app/count`);
        console.log(res);
        if (res.status === 200) {
          setCount1(res.data.data.preparingCount);
          setCount2(res.data.data.watingCount);
          setCount3(res.data.data.refusalCount);
        } else {
          console.log(res.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
    awaitCount();
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

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderMainPageBtn from "../../components/organisms/trader/TraderMainPageBtn";
import TraderMainProfile from "../../components/organisms/trader/TraderMainProfile";
import TraderMainCount from "../../components/organisms/trader/TraderMainCount";
import { customAxios } from "../../components/api/customAxios";

const TraderMainPage = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const navigate = useNavigate();

  // 데이터를 불러오는 함수
  const fetchData = async (accessToken: string) => {
    try {
      const res = await customAxios.get(`/statement/worker/list/app/count`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCount1(res.data.data.preparingCount);
      setCount2(res.data.data.watingCount);
      setCount3(res.data.data.refusalCount);
    } catch (error) {
      console.error("Error fetching data: ", error);
      // 에러 처리 로직 (예: 토큰 만료 시 로그인 페이지로 리다이렉트)
    }
  };

  // 토큰을 확인하고 데이터를 불러오는 함수
  const checkAndFetchData = async () => {
    const storedValue = localStorage.getItem("recoil-persist");
    const accessToken =
      storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;

    if (accessToken) {
      await fetchData(accessToken);
    } else {
      // 토큰이 없는 경우 로그인 페이지로 리다이렉트
      navigate("/login");
    }
  };

  // 컴포넌트가 마운트될 때 데이터 불러오기
  useEffect(() => {
    checkAndFetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("recoil-persist");
    navigate("/m");
    window.location.reload();
  };

  return (
    <StyledContainer>
      <StyledLogout>
        <MdLogout size="1.5rem" color="#0a3145" onClick={logout} />
      </StyledLogout>
      <StyledAni1>
        <TraderMainProfile />
      </StyledAni1>
      <MainPaddingContainer>
        <StyledAni2>
          <TraderMainCount count1={count1} count2={count2} count3={count3} />
        </StyledAni2>
        <TraderMainPageBtn />
      </MainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderMainPage;

const StyledContainer = styled.div`
  background-color: #ecf4ff;
  height: 100vh;
`;

const StyledLogout = styled.div`
  padding-top: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledAni1 = styled.div`
  animation: ${fadeInRight} 0.8s ease-out 0.1s both;
`;

const StyledAni2 = styled.div`
  animation: ${fadeInRight} 0.8s ease-out 0.4s both;
`;

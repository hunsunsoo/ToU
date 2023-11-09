import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import {
  S_INFO,
  S_MAIN,
  T_CONFIRM,
  T_CREATE,
  T_GETLIST,
  T_LANDING,
  T_LOGIN,
  T_MAIN,
  T_SECTION,
  T_SIGN,
  T_STATE,
  // O_EDIT,
  O_LOGIN,
  O_MAIN,
  O_CREATE,
  O_DETAIL,
  O_MANAGE,
  O_STOCK,
  O_NOTICE,
} from "./pages/Pages";
import { ROUTES } from "./commons/Routes";
import ShopperHeader from "./components/organisms/shopper/ShopperHeader";
import { MobileGlobalStyle } from "./commons/style/mobileStyle/MobileGlobalStyle";
import OfficerHeader from "./components/organisms/officer/OfficerHeader";

import { useRecoilValue } from "recoil";
import { UserInfoState } from "./store/State";

interface ShopperContainerProps {
  isMain: boolean;
}

const RoutesContainer = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Routes>
      {/* 소비자 (url/product) */}
      <Route
        path={ROUTES.SHOPPER_URL}
        element={
          <ShopperContainer isMain={location.pathname === "/product"}>
            <MobileGlobalStyle />
            <ShopperHeader />
            <Routes>
              <Route path={ROUTES.SHOPPER_MAIN} element={<S_MAIN />} />
              <Route path={ROUTES.SHOPPER_INFO} element={<S_INFO />} />
            </Routes>
          </ShopperContainer>
        }
      />
      {/* 업체 모바일 (url/m) */}
      <Route
        path={ROUTES.TRADER_URL}
        element={
          <TraderContainer>
            <MobileGlobalStyle />
            <Routes>
              <Route path={ROUTES.TRADER_LANDING} element={<T_LANDING />} />
              <Route path={ROUTES.TRADER_MAIN} element={<T_MAIN />} />
              <Route path={ROUTES.TRADER_LOGIN} element={<T_LOGIN />} />
              <Route path={ROUTES.TRADER_CONFIRM} element={<T_CONFIRM />} />
              <Route path={ROUTES.TRADER_CREATE} element={<T_CREATE />} />
              <Route path={ROUTES.TRADER_GETLIST} element={<T_GETLIST />} />
              <Route path={ROUTES.TRADER_SECTION} element={<T_SECTION />} />
              <Route path={ROUTES.TRADER_SIGN} element={<T_SIGN />} />
              <Route path={ROUTES.TRADER_STATE} element={<T_STATE />} />
            </Routes>
          </TraderContainer>
        }
      />

      {/* 웹 (url) */}
      <Route
        path={ROUTES.OFFICER_URL}
        element={
          useRecoilValue(UserInfoState)?.accessToken != null ? (
            <OfficerContainer>
              <OfficerHeader />
              <Routes>
                <Route path={ROUTES.OFFICER_MAIN} element={<O_MAIN />} />
                <Route path={ROUTES.OFFICER_CREATE} element={<O_CREATE />} />
                <Route path={ROUTES.OFFICER_MANAGE} element={<O_MANAGE />} />
                <Route path={ROUTES.OFFICER_STOCK} element={<O_STOCK />} />
                <Route path={ROUTES.OFFICER_NOTICE} element={<O_NOTICE />} />
                <Route path={ROUTES.OFFICER_DETAIL} element={<O_DETAIL />} />
              </Routes>
            </OfficerContainer>
          ) : (
            <OfficerContainer>
              <OfficerHeader />
              <Routes>
                <Route path={ROUTES.OFFICER_LOGIN} element={<O_LOGIN />} />
              </Routes>
            </OfficerContainer>
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <RoutesContainer />
      </Router>
    </RecoilRoot>
  );
};

export default App;

const ShopperContainer = styled.div<ShopperContainerProps>`
  background-color: #eff7ff;
  /* background-image: linear-gradient(
    172deg,
    #cfe7ff 48.53%,
    rgba(74, 168, 255, 0.89) 98.64%
  ); */
    overflow: hidden;
`;

const TraderContainer = styled.div``;

const OfficerContainer = styled.div``;

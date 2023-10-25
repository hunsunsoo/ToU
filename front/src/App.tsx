import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  S_INFO,
  S_MAIN,
  // T_CONFIRM,
  // T_CREATE,
  // T_GETLIST,
  // T_LANDING,
  // T_LOGIN,
  T_MAIN,
  // T_SECTION,
  // T_SIGN,
  // T_STATE,
  // O_CREATE,
  // O_DETAIL,
  // O_EDIT,
  // O_LOGIN,
  // O_MAIN,
  // O_MANAGE,
  // O_NOTICE
} from "./pages/Pages";

// 소비자 모바일 (url/product)
const App1 = () => {
  return (
    <Routes>
      <Route path="/" element={<S_MAIN />} />
      <Route path="info" element={<S_INFO />} />
    </Routes>
  );
};
// 업체 모바일 (url/m)
function App2() {
  // return <div className="App">App2</div>;
  return(
    <Routes>
      <Route path="/" element={<T_MAIN/>}/>
    </Routes>
  );
}

// 웹 (url)
function App3() {
  return <div className="App">App3</div>;
}

export { App1, App2, App3 };

import { styled } from "styled-components";
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi';

// import OfficerHeader from "../../components/organisms/officer/OfficerHeader";
import OfficerBtn from "../../components/atoms/officer/OfficerBtn";

const OfficerLoginPage = () => {
  const onClick = () => {

  }

  return (
    <MainDiv>
      <GridDiv>
        <LeftImage
          src="/ToU_Web.png"
          alt="Logo"
        />
        <LoginDiv>
          <LoginIconDIv>
            <BiSolidUser color="#666666" size={"30px"} style={{marginRight: "15px"}}/>
            <TextDiv> I D</TextDiv>
          </LoginIconDIv>
          <StyleInput/>
        </LoginDiv>
        <LoginDiv>
          <LoginIconDIv>
            <BiSolidLockAlt color="#666666" size={"30px"} style={{marginRight: "15px"}}/>
            <TextDiv>PW</TextDiv>
          </LoginIconDIv>
          <StyleInput/>
        </LoginDiv>
        <LoginBtnDiv>
          <OfficerBtn
            isImg={false}
            onClick={onClick}>
            로그인
          </OfficerBtn>
        </LoginBtnDiv>
      </GridDiv>
      <GridDiv>
        <RightImage
          src="/WebMainPic.png" 
          alt="" 
        />
      </GridDiv>
    </MainDiv>
  );
};

export default OfficerLoginPage;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: calc(100vh - 40px);
  overflow: hidden;
`

const GridDiv = styled.div`
  height: 100%;
`

const LeftImage = styled.img`
  height: 70px; 
  margin: 15% 0 6% 20%;
`
const RightImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  padding-bottom: 0;
`

const LoginDiv = styled.div`
  display: flex;
  height: 8%;
  margin-left: 20%;
  margin-top: 1%;
`

const LoginIconDIv = styled.div`
  display: flex;
  background-color: #F0F0F0;
  border: 3px solid #D9D9D9;
  align-items: center;
  padding: 10px 10px 10px 15px;
  font-size: 25px;
  
`

const TextDiv = styled.div`
  width: 60px;
  color: #666666;
`

const StyleInput = styled.input`
  border: 3px solid #D9D9D9;
  margin-left: -3px;
  width: 350px;
`

const LoginBtnDiv = styled.div`
  margin: 3% 0 0 50%;
`
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";
import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
import "./css/embla.css";
import { useEffect, useState, useCallback } from "react";
import { customAxios } from "../../components/api/customAxios";
import { useNavigate } from "react-router-dom";
import ShopperBtn from "../../components/atoms/shopper/ShopperBtn";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const ShopperMainPage = () => {
  const navigate = useNavigate();

  const { productSeq } = useParams<{ productSeq: string }>();
  const [thumbnails, setThumbnails] = useState([]);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    customAxios.get(`/consumer/fabric/${productSeq}`).then((res) => {
      // console.log(res);
      if (!res.data.data || !res.data.data.distribution) {
        // If thumbnails are undefined, navigate to the notfound page
        navigate(`/product/notfound`);
        return;
      }
      setThumbnails(res.data.data.distribution);
      setProductName(res.data.data.productName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(thumbnails);

  // 토글버튼
  const [viewEarth, setViewEarth] = useState(false);
  const onChange = useCallback(() => {
    // checked 상태를 토글
    setViewEarth(!viewEarth);
  }, [viewEarth]);

  return (
    <>
      <HeaderContainer>
        <ShopperBtn
          src="/ToU.png"
          alt="Logo"
          isLogo={true}
          onClick={() => navigate(`/product/${productSeq}`)} // 로고 클릭 시 메인으로 이동
        />
        {/* 토글 */}
        <SlideToggleLabel className="slide-toggle" viewEarth={viewEarth}>
          <SlideToggleInput
            type="checkbox"
            onChange={onChange}
            checked={viewEarth}
          />
          <SlideToggleSlider
            className="slider"
            viewEarth={viewEarth}
            src="/ToggleMap.png"
          ></SlideToggleSlider>
        </SlideToggleLabel>
        <ShopperBtn
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png"
          alt="Information"
          onClick={() => navigate("/product/info")} // 정보 클릭 시 info로 이동
        />
      </HeaderContainer>
      <StyledMainPaddingContainer>
        <ShopperTitle title={productName} />
        <section className="sandbox__carousel">
          <EmblaCarousel
            slides={SLIDES}
            options={OPTIONS}
            thumbnails={thumbnails}
            viewEarth={viewEarth}
          />
        </section>
      </StyledMainPaddingContainer>
    </>
  );
};

export default ShopperMainPage;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: sticky;
  top: 0;
`;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  width: 100%;
  justify-content: space-around;
`;

const SlideToggleSlider = styled.img<{ viewEarth: boolean }>`
  position: absolute;
  content: "";
  height: 25px;
  width: 25px;
  right: 25px;
  bottom: -6px;
  padding: 3px;
  background-color: #545a96;
  /* background-image: url('/ToggleMap.png'); */
  border-radius: 50%;
  transition: 0.4s;
  transform: ${(props) =>
    props.viewEarth ? "translateX(30px)" : "translateX(0)"};
`;

const SlideToggleLabel = styled.label<{ viewEarth: boolean }>`
  position: relative;
  display: inline-block;
  right: 20px;
  width: 50px;
  height: 20px;
  background-color: ${(props) => (props.viewEarth ? "#3479FF" : "#CACACA")};
  border-radius: 10px;
  cursor: pointer;
`;

const SlideToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

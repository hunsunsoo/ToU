// import { useEffect } from "react";
// import { styled } from "styled-components";
// import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
// import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
// import ShopperItemList from "../../components/organisms/shopper/ShopperItemList";
// import { customAxios } from "../../components/api/customAxios";

// const ShopperMainPage = () => {
//   useEffect(() => {
//     customAxios.get(`/consumer/140`).then((res) => {
//       console.log(res);
//     });
//   });
//   return (
//     <StyledMainPaddingContainer>
//       <ShopperTitle />
//       <ShopperItemList />
//     </StyledMainPaddingContainer>
//   );
// };

// export default ShopperMainPage;

// const StyledMainPaddingContainer = styled(MainPaddingContainer)`
//   display: flex;
//   flex-direction: column;
//   height: calc(100vh - 56px);
//   width: 100%;
// `;

import { styled } from "styled-components";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";
import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
// import ShopperItemList from "../../components/organisms/shopper/ShopperItemList";
import "./css/embla.css";
// import "./css/base.css";
// import "./css/sandbox.css";
import { useEffect, useState } from "react";
import { customAxios } from "../../components/api/customAxios";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const ShopperMainPage = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    customAxios.get(`/consumer/140`).then((res) => {
      console.log(res)
      setThumbnails(res.data.data.distribution)
      setProductName(res.data.data.productName)
    });
  });
  return (
    <StyledMainPaddingContainer>
       <ShopperTitle title={productName} /> 
      {/* <ShopperItemList /> */}
      <section className="sandbox__carousel">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} thumbnails={thumbnails}/>
      </section>
    </StyledMainPaddingContainer>
  );
};

export default ShopperMainPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  width: 100%;
`;

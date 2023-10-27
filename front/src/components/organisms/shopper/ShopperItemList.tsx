// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styled from "styled-components";
import ShopperItem from "../../atoms/shopper/ShopperItem";
import { citiesScrollMap } from "../../../constants";
import type { Cities } from "../../../constants";

const isCity = (content: string): content is Cities => {
  if (Object.keys(citiesScrollMap).includes(content)) return true;
  return false;
};

const ShopperItemList = () => {
  return (
    <>
      {Object.keys(citiesScrollMap).map((content) => {
        if (!isCity(content)) return null;
        return (
          <ShopperItem
            content={content}
            scrollStart={citiesScrollMap[content][0]}
            scrollHeight={800}
            key={content}
          />
        );
      })}
    </>
  );
};

export default ShopperItemList;

// const StyledDiv = styled.div`
//   display: flex;
// `;

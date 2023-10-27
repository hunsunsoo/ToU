// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import ShopperItem from "../../atoms/shopper/ShopperItem";
const ShopperItemList = () => {


  return (
    <StyledDiv>
      <ShopperItem content="1 생산" />
      <ShopperItem content="2 입고" />
      <ShopperItem content="3 가공" />
      <ShopperItem content="4 판매" />
    </StyledDiv>
  );
};

export default ShopperItemList;

const StyledDiv = styled.div`
  display: flex;
`
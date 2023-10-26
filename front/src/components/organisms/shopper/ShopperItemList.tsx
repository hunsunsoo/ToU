import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShopperItem from "../../atoms/shopper/ShopperItem";

const ShopperItemList = () => {
  const settings = {
    className: "center",
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
    autoplay: true, // 자동 재생 활성화
    focusOnSelect: true, // 선택된 슬라이드에 포커스 (선택 시 중앙으로 이동)
  };

  return (
    <div>
      <Slider {...settings}>
        <ShopperItem content="생산" />
        <ShopperItem content="입고" />
        <ShopperItem content="가공" />
        <ShopperItem content="판매" />
      </Slider>
    </div>
  );
};

export default ShopperItemList;

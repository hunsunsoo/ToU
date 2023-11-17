import React from "react";
import ShopperInfoCard from "./ShopperInfoCard";

const ShopperInfoCardList: React.FC = () => {
  const cards = ["생산", "가공", "유통", "판매"];

  return (
    <div>
      {cards.map((card) => (
        <ShopperInfoCard key={card} title={card} />
      ))}
    </div>
  );
};

export default ShopperInfoCardList;

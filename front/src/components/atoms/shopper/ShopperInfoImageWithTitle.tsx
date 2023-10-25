import React from "react";
import styled from "styled-components";

interface ShopperInfoCardProps {
  title: string;
}

interface ImageInfo {
  src: string;
  alt: string;
}

interface Images {
  [key: string]: ImageInfo;
}

const IMAGES: Images = {
  생산: {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Fishing%20Pole.png",
    alt: "Fishing Pole",
  },
  가공: {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Factory.png",
    alt: "Factory",
  },
  유통: {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Delivery%20Truck.png",
    alt: "Delivery Truck",
  },
  판매: {
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shopping%20Cart.png",
    alt: "Shopping Cart",
  },
};

const ShopperInfoImageWithTitle: React.FC<ShopperInfoCardProps> = ({
  title,
}) => {
  const image = IMAGES[title];
  return (
    <LeftContainer>
      <CardTitle>{title}</CardTitle>
      {image && <CardImage src={image.src} alt={image.alt} />}
    </LeftContainer>
  );
};

export default ShopperInfoImageWithTitle;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-right: 1px solid #ccc;
`;

const CardTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  align-self: center;
`;

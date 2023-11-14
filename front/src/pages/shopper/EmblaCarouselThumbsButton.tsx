import React from "react";
import styled from "styled-components";

type BranchType = "PRODUCT" | "PROCESS" | "PACKAGING" | "SELL";

type ThumbProps = {
  selected: boolean;
  index: number;
  onClick: () => void;
  branchType: BranchType; //
};

const IMAGES = {
  PRODUCT: {
    text: "생산",
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Fishing%20Pole.png",
    alt: "Fishing Pole",
  },
  PROCESS: {
    text: "가공",
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Factory.png",
    alt: "Factory",
  },
  PACKAGING: {
    text: "유통",
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Delivery%20Truck.png",
    alt: "Delivery Truck",
  },
  SELL: {
    text: "판매",
    src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shopping%20Cart.png",
    alt: "Shopping Cart",
  },
};

export const Thumb: React.FC<ThumbProps> = ({
  selected,
  index,
  onClick,
  branchType,
}) => {
  const imageInfo = IMAGES[branchType];

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <Button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="embla-thumbs__slide__info">
          <StyledBranchType>
            {imageInfo ? imageInfo.text : branchType}
          </StyledBranchType>
          {imageInfo && <Image src={imageInfo.src} alt={imageInfo.alt} />}
        </div>
      </Button>
    </div>
  );
};

const Button = styled.button`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 3rem;
  height: auto;
`;

const StyledBranchType = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0;
`;

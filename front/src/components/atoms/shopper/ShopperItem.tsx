import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useScroll } from "../../../hooks";

interface ShopperItemProps {
  content: string;
  scrollStart: number;
  scrollHeight: number;
}

const ShopperItem: React.FC<ShopperItemProps> = ({
  content,
  scrollStart,
  scrollHeight,
}) => {
  const { y: scrollY } = useScroll(100);

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (scrollY > scrollStart && scrollY < scrollHeight + scrollStart) {
      setIsShown(true);
    } else setIsShown(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isShown && <StyledDiv>{content}</StyledDiv>}
    </AnimatePresence>
  );
};

export default ShopperItem;

const StyledDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

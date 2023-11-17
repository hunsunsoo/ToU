import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import ShopperItem from "../../atoms/shopper/ShopperItem";
import { Item } from "../../../types/ShopperTypes";
import Dots from "../../atoms/shopper/ShopperDots";

// 각 아이템의 데이터 배열
const items: Item[] = [
  {
    id: 1,
    title: "생산",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Fishing%20Pole.png",
    content: "노르웨이",
  },
  {
    id: 2,
    title: "가공",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Factory.png",
    content: "어쩌구",
  },
  {
    id: 3,
    title: "입고",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Delivery%20Truck.png",
    content: "저쩌구",
  },
  {
    id: 4,
    title: "판매",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shopping%20Cart.png",
    content: "우하항",
  },
];

const ShopperItemList = () => {
  // 현재 선택된 아이템의 인덱스 상태를 관리합니다.
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 메인 캐러셀과 썸네일 캐러셀에 대한 참조(ref)와 API를 생성합니다.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  // EmblaCarousel에 표시될 아이템 선택
  const selectItem = (index: number) => {
    if (!emblaApi) return;
    setSelectedIndex(index);
    emblaApi.scrollTo(index);
  };

  // 썸네일 클릭 시 실행할 함수
  const onThumbClick = (index: number) => {
    setSelectedIndex(index);
    // 'emblaThumbsApi'로 썸네일 캐러셀을 스크롤합니다.
    if (emblaThumbsApi) {
      emblaThumbsApi.scrollTo(index, true); // true를 추가하여 선택된 항목이 뷰포트 시작점에 오도록 할 수 있습니다.
    }
    // 'emblaApi'로 메인 캐러셀도 스크롤합니다.
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  // 인덱스에 따라 이미지 소스를 얻는 함수 (인덱스 타입을 number로 지정)
  const imageByIndex = (index: number) => `${index + 1}.png`;

  // 메인 캐러셀과 썸네일을 동기화하기 위한 효과(effect)
  useEffect(() => {
    if (!emblaApi || !emblaThumbsApi) return;

    const onMainSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
    };

    const onThumbSelect = () => {
      if (
        emblaApi.selectedScrollSnap() !== emblaThumbsApi.selectedScrollSnap()
      ) {
        emblaApi.scrollTo(emblaThumbsApi.selectedScrollSnap());
      }
    };

    emblaApi.on("select", onMainSelect);
    emblaThumbsApi.on("select", onThumbSelect);

    // 이벤트 리스너를 클린업합니다.
    return () => {
      emblaApi.off("select", onMainSelect);
      emblaThumbsApi.off("select", onThumbSelect);
    };
  }, [emblaApi, emblaThumbsApi]);

  return (
    <StyledContainer>
      {/* 메인 캐러셀 컨테이너 */}
      <Embla>
        <EmblaViewport className="embla__viewport" ref={emblaRef}>
          <EmblaContainer className="embla__container">
            {/* 선택된 아이템의 이미지를 `imageByIndex` 함수를 사용하여 렌더링합니다. */}
            <EmblaSlide
              className={`embla__slide is-selected`}
              key={items[selectedIndex].id}
              onClick={() => selectItem(selectedIndex)}
            >
              {/* `imageByIndex` 함수로 이미지 경로를 설정합니다. */}
              <StyledImg
                src={imageByIndex(selectedIndex)}
                alt={items[selectedIndex].title}
              />
            </EmblaSlide>
          </EmblaContainer>
        </EmblaViewport>
      </Embla>

      {/* 썸네일 캐러셀 */}
      <Embla className="embla embla--thumbnails">
        <EmblaViewport className="embla__viewport" ref={emblaThumbsRef}>
          <EmblaContainer className="embla__container">
            {items.map((item, index) => (
              <ThumbnailSlide
                isSelected={selectedIndex === index} // isSelected prop을 추가합니다.
                key={`${item.id}-thumb`}
                onClick={() => onThumbClick(index)}
              >
                {/* 썸네일에 ShopperItem을 렌더링 */}
                <ShopperItem
                  title={item.title}
                  image={item.image}
                  content={item.content}
                />
              </ThumbnailSlide>
            ))}
          </EmblaContainer>
        </EmblaViewport>
      </Embla>

      {/* Dots 컴포넌트를 추가합니다. */}
      <Dots
        number={items.length}
        selectedIndex={selectedIndex}
        onThumbClick={onThumbClick}
      />
    </StyledContainer>
  );
};

export default ShopperItemList;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Embla = styled.div`
  overflow: hidden;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
`;

const EmblaContainer = styled.div`
  display: flex;
  will-change: transform;
  justify-content: center;
`;

const EmblaSlide = styled.div`
  position: relative;
  flex: 0 0 auto;
`;

const StyledImg = styled.img`
  width: 15rem;
`;

// 썸네일에 대한 스타일 컴포넌트를 새로 정의합니다.
const ThumbnailSlide = styled(EmblaSlide)<{ isSelected: boolean }>`
  /* 기본 스타일 */
  flex: 0 0 auto;
  margin-right: 5px; // 모든 썸네일에 동일한 마진을 적용합니다.

  transform: ${({ isSelected }) => (isSelected ? "scale(1.1)" : "scale(1)")};
  transition: border 0.3s, transform 0.3s; // transform에 대한 transition을 추가합니다.

  z-index: ${({ isSelected }) => (isSelected ? "1" : "0")};

  &:hover {
    cursor: pointer;
  }
`;

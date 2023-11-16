import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router';
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import imageByIndex from "./imageByIndex";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Modal from "./EmblaModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/sharp-light-svg-icons";
import BranchLocationComponent from "./BranchLocationDiv";
import NotFound from "./NotFound";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  thumbnails: any[];
  viewEarth: boolean;
};

type MapContainerProps = {
  center: {
    lat: number;
    lng: number;
  };
  index: number;
};

const mapStyles: Array<google.maps.MapTypeStyle> = [
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const MapContainer: React.FC<MapContainerProps> = ({ center, index }) => {
  const containerStyle = {
    width: "100%",
    height: "350px",
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is not defined.");
    return null; // 또는 에러 처리를 할 수 있는 다른 방식으로 수정
  }

  const getMarkerUrl = (index: number) => {
    // 여기서 index 값을 기반으로 조건을 걸어 적절한 이미지 URL을 반환해
    switch (index) {
      case 0:
        return "/Marker1.png";
      case 1:
        return "/Marker2.png";
      case 2:
        return "/Marker3.png";
      case 3:
        return "/Marker4.png";
      default:
        return ""; // 기본값 설정 or 에러 처리
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        options={{
          styles: mapStyles,
          mapTypeControl: false, // 지도 or 위성 버튼
          zoomControl: true, // 줌 버튼
          streetViewControl: false, // 스트릿뷰 버튼
          fullscreenControl: false, // 전체화면 버튼
        }}
      >
        <MarkerF
          position={center}
          icon={{
            url: getMarkerUrl(index),
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  thumbnails,
  viewEarth,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const navigate = useNavigate();

  console.log(thumbnails);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // 모달 관련
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달 함수
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    setTimeout(() => {
      if (
        thumbnails[3] && // thumbnails[3]가 존재하는 경우에만 실행
        (Math.abs(currentLocation.lat - thumbnails[3].latitude) > 0.01 ||
          Math.abs(currentLocation.lng - thumbnails[3].longitude) > 0.01)
      ) {
        setIsModalOpen(true);
        console.log("모달상태" + isModalOpen);
      }
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnails]);

  // 모달 내용을 조건부로 설정
  const modalContent =
    thumbnails[3] && // thumbnails[3]가 존재하는 경우에만 실행
    (Math.abs(currentLocation.lat - thumbnails[3].latitude) > 0.01 ||
      Math.abs(currentLocation.lng - thumbnails[3].longitude) > 0.01) ? (
      // 경고창이 뜰 경우
      <div style={{ textAlign: "center" }}>
        <div style={{ textAlign: "end", cursor: "pointer" }}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={closeModal}
            style={{ fontSize: "30px" }}
          />
        </div>
        <img src="/alertModal.png" alt="" style={{ width: "170px" }} />
        <p>복제/위변조로 의심되는 상품입니다.</p>
      </div>
    ) : // 경고창 안뜰경우
    null;

  return (
    <div className="embla">
      {/* 케러셀 구글맵 API */}
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {viewEarth ? (
            <>
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="embla__slide">
                  <div className="embla__slide__number">
                    <span>{index + 1}</span>
                  </div>
                  <MapContainer
                    key={index}
                    center={{
                      lat: thumbnail.latitude,
                      lng: thumbnail.longitude,
                    }}
                    index={index}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {slides.map((index) => (
                <div className="embla__slide" key={index}>
                  <img
                    className="embla__slide__img"
                    src={imageByIndex(index)}
                    alt="Your alt text"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} modalType={"type1"}>
        {modalContent}
      </Modal>

      {thumbnails[selectedIndex] && (
        <BranchLocationComponent
          key={selectedIndex}
          location={thumbnails[selectedIndex].branchLocation}
          date={thumbnails[selectedIndex].stockDate}
          branch={thumbnails[selectedIndex].branchName}
        />
      )}

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {thumbnails.map((thumbnail, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                branchType={thumbnail.branchType}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
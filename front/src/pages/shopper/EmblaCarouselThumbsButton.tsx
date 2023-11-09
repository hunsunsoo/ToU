import React from "react";

type ThumbProps = {
  selected: boolean;
  index: number;
  onClick: () => void;
  branchName: string;
  branchLocation: string;
  branchType: string;
  // Add more properties as needed
};

export const Thumb: React.FC<ThumbProps> = ({
  selected,
  index,
  onClick,
  branchName,
  branchLocation,
  branchType,
  // Destructure more properties as needed
}) => {
  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="embla-thumbs__slide__number">
          <span>{index + 1}</span>
        </div>
        <div className="embla-thumbs__slide__info">
          <p>{branchName}</p>
          <p>{branchLocation}</p>
          <p>{branchType}</p>
        </div>
      </button>
    </div>
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface Item {
  seq: number;
  name: string;
  date: Date; 
}

interface TraderItemDropdownProps {
  items: Item[];
  selectedItem: Item | null;
  onSelect: (item: Item) => void;
}

const TraderItemDropdown: React.FC<TraderItemDropdownProps> = ({
  items,
  onSelect,
  selectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 날짜 표기 형식 변환
  const formatDateString = (dateString: string | undefined) => {
    if (!dateString) {
      return "";
    }
    const formattedDate = new Date(dateString);
    const isoString = formattedDate.toISOString();
    const datePart = isoString.split("T")[0]; // '2023-11-02'
    const timePart = isoString.split("T")[1]; // '14:30:00.000Z'
    const hourMinute = timePart.split(":").slice(0, 2).join(":"); // '14:30'
    return `${datePart} ${hourMinute}`; // '2023-11-02 14:30'
  };
  

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedItem?.name || "선택하세요"}
        {isOpen ? <BiChevronUp size="30" /> : <BiChevronDown size="30" />}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {items.map((item) => (
            <DropdownListItem
              key={item.seq}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              <ItemName>{item.name}</ItemName>
              <ItemDate>{formatDateString(item.date.toLocaleString("ko-KR"))} 입고</ItemDate>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  width: 100%
`;

const DropdownButton = styled.button`
  height: 2.813rem;
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;

const DropdownList = styled.ul`
  font-size: 1rem;
  position: absolute;
  top: 100%;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const DropdownListItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const ItemName = styled.span`
  display: block;
`;

const ItemDate = styled.span`

`;

export default TraderItemDropdown;

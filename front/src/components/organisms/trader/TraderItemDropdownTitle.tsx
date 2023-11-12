import React from 'react'
import styled from "styled-components";
import TraderItemDropdown from '../../atoms/trader/TraderItemDropdown';

interface Item {
  seq: number;
  name: string;
  date: Date; 
}

interface TraderItemDropdownTitleProps {
  inputTitle: string;
  items: Item[];
  selectedItem: Item | null | any;
  onSelect: (item: Item) => void;
}

const TraderItemDropdownTitle = ({ inputTitle, items, onSelect, selectedItem }: TraderItemDropdownTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderItemDropdown items={items} onSelect={onSelect} selectedItem={selectedItem} />
    </Container>
  );
};

export default TraderItemDropdownTitle;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* gap: 10px; */
    margin: 30px 0 30px 0;
`;

const InputTitle = styled.span`
    /* margin-left: 10px; */
    font-size: 1rem;
`;
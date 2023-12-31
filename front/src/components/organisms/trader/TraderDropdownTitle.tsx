import React from 'react'
import styled from "styled-components";
import TraderDropdown from '../../atoms/trader/TraderDropdown';

interface Item {
  seq: number;
  name: string;
}

interface TraderDropdownTitleProps {
  inputTitle: string;
  items: Item[];
  selectedItem: Item | null;
  onSelect: (item: Item) => void;
}

const TraderDropdownTitle = ({ inputTitle, items, onSelect, selectedItem }: TraderDropdownTitleProps) => {
  return (
    <Container>
      <InputTitle>{inputTitle}</InputTitle>
      <TraderDropdown items={items} onSelect={onSelect} selectedItem={selectedItem} />
    </Container>
  );
};

export default TraderDropdownTitle;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* gap: 10px; */
    margin: 30px 0 30px 0;
`;

const InputTitle = styled.span`
    /* margin-left: 0.625rem; */
    font-size: 1rem;
`;
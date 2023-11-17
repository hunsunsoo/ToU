import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface TraderUnitDropdownProps {
  selectedUnit: string;
}

const options = ["kg", "ton", "개", "마리"];

const TraderUnitDropdown: React.FC<TraderUnitDropdownProps> = ({ selectedUnit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    setSelectedOption(selectedUnit || options[0]);
  }, [selectedUnit]);
  
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        {isOpen ? <BiChevronUp  size = "30"/> : <BiChevronDown  size = "30"/>}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem 
              key={option} 
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}>
              {option}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};


export default TraderUnitDropdown;

const DropdownContainer = styled.div`
  position: relative;
  margin-left: 10px;
`;

const DropdownButton = styled.button`
  height: 2.813rem;
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background-color: #ffffff;
`;

const DropdownList = styled.ul`
  font-size: 16px;
  position: absolute;
  top: 100%;
  width: 100%;
  /* width: fit-content; // 추가 */
  /* left: 50%; // 추가
  transform: translateX(-50%); // 추가 */
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownListItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;


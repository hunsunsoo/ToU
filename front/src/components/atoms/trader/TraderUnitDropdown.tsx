import React, { useState } from 'react';
import styled from 'styled-components';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const options = ["kg", "개"];

const TraderUnitDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

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

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  height: 45px;
  width: 100px;
  padding: 10px 15px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background-color: transparent;
`;

const DropdownList = styled.ul`
 font-size: 16px;
  position: absolute;
  top: 100%;
  width: 100px;
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
  z-index: 2;
`;

const DropdownListItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;

export default TraderUnitDropdown;

// Dropdown.tsx
import React, { useState } from 'react';

type SortOption = "latest" | "oldest";

interface DropdownProps {
  onSortChange: (option: SortOption) => void;
}

const TraderStateDropdown: React.FC<DropdownProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>("latest");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortOption;
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <select value={selectedSort} onChange={handleChange}>
      <option value="latest">최신순</option>
      <option value="oldest">오래된순</option>
    </select>
  );
};

export default TraderStateDropdown;

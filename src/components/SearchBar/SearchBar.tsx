import React, { ChangeEvent } from 'react';
import './SearchBar.css';

type Props = {
  onChange: (newValue: string) => void;
}

const SearchBar: React.FC<Props> = ({ onChange }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <input
      className="SearchBar"
      type="text"
      placeholder="Search by user name..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;

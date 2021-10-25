import classnames from 'classnames';
import React, { ChangeEvent } from 'react';
import './SearchBar.css';

type Props = {
  onChange: (newValue: string) => void;
  className?: string;
}

const SearchBar: React.FC<Props> = ({ className, onChange }) => {
  const classNames = classnames('SearchBar', className);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <input
      className={classNames}
      type="text"
      placeholder="Search by user name..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;

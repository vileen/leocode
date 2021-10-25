import React, { useState } from 'react';
import UsersList from './components/UsersList';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');

  function handleSearchValueChange(newValue: string) {
    setSearchValue(newValue);
  }

  return (
    <div className="App">
      <div className="App__title">Users list</div>
      <SearchBar className="App__searchBar" onChange={handleSearchValueChange} />
      <UsersList className="App__usersList" searchValue={searchValue} />
    </div>
  );
}

export default App;

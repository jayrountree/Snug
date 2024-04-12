import React, { useContext, useEffect, useState } from "react";

const Searchbar = ({ search, setSearch, setSearchWords }) => {
  return (
    <div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => {
          setSearchWords(search.split(' '));
        }}>Search</button>
      </div>
  );
};

export default Searchbar;

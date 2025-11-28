import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

interface ISearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: ISearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery,onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  }
  const handleReset = () => {
    setSearchQuery('');
    onSearch('');
  }

  return (
    <div className={style.search_container}>
      <input
        className={style.search_wrapper}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Поиск"
      />
      <button onClick={handleReset} className={style.button_reset}>
        Сбросить
      </button>
    </div>
  );
};
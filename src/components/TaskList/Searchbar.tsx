import * as React from "react";
import type { SearchbarProps } from "../../types";

const Searchbar: React.FC<SearchbarProps> = ({ onSearch, value }) => {
  return (
    <>
      <input
        aria-label="Search tasks"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="focus:outline-none border border-solid border-Black100 rounded-2xl px-2.5 py-3.5"
      />
    </>
  );
};

export default Searchbar;

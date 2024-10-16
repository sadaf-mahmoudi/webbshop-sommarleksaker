import { useState } from "react";
import { GrSort } from "react-icons/gr";
import "../style/SortBy.css";

const SortBy = ({ list, setList }) => {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const sortItems = (direction, criteria = "price") => {
    const sortedItems = [...list].sort((a, b) => {
      if (criteria === "price") {
        return direction === "asc" ? a.price - b.price : b.price - a.price;
      } else if (criteria === "name") {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0; 
    });
    setList(sortedItems);
    setShowSortOptions(false); 
  };

  return (
    <div className="sort-container">
      <button
        className="sort-btn"
        onClick={() => setShowSortOptions(!showSortOptions)}
      >
        <GrSort /> Sortera
      </button>
      {showSortOptions && (
        <div className="sort-options">
          <button onClick={() => sortItems("asc")}>Lägsta pris</button>
          <button onClick={() => sortItems("desc")}>Högsta pris</button>
          <button onClick={() => sortItems("asc", "name")}>A - Ö</button>
          <button onClick={() => sortItems("desc", "name")}>Ö - A</button>
        </div>
      )}
    </div>
  );
};

export default SortBy;

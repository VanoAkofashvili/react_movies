import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../../context";

export default function Search() {
  const inputRef = useRef(null);
  const { setSearchTerm } = useGlobalContext();

  useEffect(() => {
    const searchInput = inputRef.current;
    return () => {
      searchInput.style.boxShadow = "none";
    };
  });

  const clickHandler = () => {
    const searchTerm = inputRef.current;
    if (!searchTerm.value) {
      searchTerm.style.boxShadow =
        "inset 0 1px 1px rgba(0,0,0,0.075), 0 0 6px #ff2929";
    } else {
      setSearchTerm(searchTerm.value);
    }
  };

  return (
    <>
      <input type="text" placeholder="ფილმის სახელი... " ref={inputRef} />
      <button className="btn btn--search mt-1" onClick={clickHandler}>
        ძებნა
      </button>
    </>
  );
}

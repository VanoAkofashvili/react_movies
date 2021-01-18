import React, { useRef, useEffect } from "react";

export default function Search() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <input type="text" placeholder="ფილმის სახელი... " ref={inputRef} />
      <button className="btn btn--search mt-1">ძებნა</button>
    </>
  );
}

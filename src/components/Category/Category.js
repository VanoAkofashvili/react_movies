import React from "react";

import { MdLabel } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";

import { Link } from "react-router-dom";

// context
import { useGlobalContext } from "../../context";

const Category = () => {
  const {
    isSidebarOpen,
    closeSidebar,
    genres,
    categoryRef,
  } = useGlobalContext();

  return (
    <div
      className={`category ${isSidebarOpen ? "category--show" : ""}`}
      ref={categoryRef}
    >
      <h4 className="flex-row-center">
        <div className="flex-row-center">
          <MdLabel className="mr-1" /> კატეგორიები
        </div>
        <div onClick={closeSidebar} className="flex-row-center category__close">
          <GrClose />
        </div>
      </h4>
      <ul>
        <li>
          <Link to="/">
            <RiArrowRightSLine /> Geo.Saitebi.Ge
          </Link>
        </li>
        {genres.map((genre) => {
          return (
            <li key={genre.id}>
              <Link to={`/genre/${genre.id}`}>
                <RiArrowRightSLine /> {genre.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;

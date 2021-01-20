import React from "react";
import { Link } from "react-router-dom";

import { IoSearchSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/img/logo_text.png";

import { useGlobalContext } from "../../context";

import Search from "../Search/Search";

export default function Header() {
  const {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isSearchOpen,
    openSearch,
    closeSearch,
    categoryIconRef,
  } = useGlobalContext();

  const categoryClickHandler = () => {
    isSidebarOpen ? closeSidebar() : openSidebar();
  };

  const searchClickHandler = () => {
    isSearchOpen ? closeSearch() : openSearch();
  };

  return (
    <div className="Header">
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="header__icons">
            <div className="header__icons__item" onClick={searchClickHandler}>
              <IoSearchSharp />
            </div>
            <div className="header__icons__item">
              <FaUserAlt />
            </div>
            <div
              className="header__icons__item cat_menu"
              onClick={categoryClickHandler}
              ref={categoryIconRef}
            >
              <GiHamburgerMenu />
            </div>
          </div>
        </div>
      </header>
      <div
        className={
          isSearchOpen ? "header__search search--show" : "header__search"
        }
      >
        <Search />
      </div>
    </div>
  );
}

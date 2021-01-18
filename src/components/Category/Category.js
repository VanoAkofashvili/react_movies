import React from "react";
import { MdLabel } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";

// context
import { useGlobalContext } from "../../context";

export default function Category() {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <div className={`category ${isSidebarOpen ? "category--show" : ""}`}>
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
          <a href="#">
            <RiArrowRightSLine /> ანიმაციური
          </a>
        </li>
        <li>
          <a href="#">
            <RiArrowRightSLine /> ანიმე
          </a>
        </li>
        <li>
          <a href="#">
            <RiArrowRightSLine /> ბიოგრაფიული
          </a>
        </li>
        <li>
          <a href="#">
            <RiArrowRightSLine /> თრილერი
          </a>
        </li>
        <li>
          <a href="#">
            <RiArrowRightSLine /> კომედიური
          </a>
        </li>
      </ul>
    </div>
  );
}

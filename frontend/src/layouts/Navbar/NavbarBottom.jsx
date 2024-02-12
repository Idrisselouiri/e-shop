import React, { useState } from "react";
import { categoriesData } from "../../components/static/Data";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { IoIosArrowDown } from "react-icons/io";
import DropDown from "./DropDown";
import { NavLink } from "react-router-dom";
import styles from "../../style/style";

const NavbarBottom = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav
      className={`${styles.FlexSection} shadow-xl shadow-slate-200 bg-slate-100 px-5`}
    >
      <div
        onClick={() => setDropDown(!dropDown)}
        className="relative py-3 w-[250px]"
      >
        <div
          className={`${styles.normalFlex} bg-white gap-5 text-[18px] font-medium py-3 px-3`}
        >
          <span>
            <BiMenuAltLeft className="text-3xl" />
          </span>
          <p>All Categories</p>
          <span>
            <IoIosArrowDown />
          </span>
        </div>
        {dropDown ? (
          <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
        ) : null}
      </div>
      <ul className={`${styles.normalFlex} gap-10 text-[18px] font-medium`}>
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink>Best Selling</NavLink>
        </li>
        <li>
          <NavLink>Products</NavLink>
        </li>
        <li>
          <NavLink>Events</NavLink>
        </li>
        <li>
          <NavLink>FAQ</NavLink>
        </li>
      </ul>
      <div className={`${styles.normalFlex} gap-3`}>
        <div className=" cursor-pointer">
          <NavLink className={`${styles.normalFlex} gap-2`} to={"/signin"}>
            <p className="font-medium text-[18px]">Singin</p>
            <CgProfile size={30} className="rgb(255 255 255 / 83%" />
          </NavLink>
        </div>
        <div className="relative cursor-pointer">
          <AiOutlineHeart size={30} className="rgb(255 255 255 / 83%" />
          <span className="absolute right-0 top-0 rounded-full bg-amber-500 w-4 h-4 p-0 m-0 text-white text-[12px] flex items-center justify-center">
            0
          </span>
        </div>
        <div className="relative cursor-pointer">
          <AiOutlineShoppingCart size={30} className="rgb(255 255 255 / 83%" />
          <span className="absolute right-0 top-0 rounded-full bg-amber-500 w-4 h-4 p-0 m-0 text-white text-[12px] flex items-center justify-center">
            0
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarBottom;

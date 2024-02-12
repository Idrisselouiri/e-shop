import React from "react";
import styles from "../../style/style";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

const NavbarTop = () => {
  return (
    <nav
      className={`${styles.FlexSection} py-5 px-5 bg-slate-100 border-b-2 border-slate-300 border-solid`}
    >
      <h1 className="font-bold text-4xl">
        E-<span className="text-amber-500">Shop</span>
      </h1>
      <form className="flex items-center justify-between border-solid border-amber-500 border-2 rounded px-2 bg-white text-md">
        <input
          type="text"
          placeholder="Search Products..."
          className="py-2 px-2 bg-transparent w-96 placeholder:text-black font-medium outline-none border-none"
        />
        <FaSearch className="hover:cursor-pointer" />
      </form>
      <button className={`${styles.button}`}>
        Become Seller <MdKeyboardArrowRight className="text-xl" />
      </button>
    </nav>
  );
};

export default NavbarTop;

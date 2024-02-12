import React from "react";
import NavbarTop from "./Navbar/NavbarTop";
import NavbarBottom from "./Navbar/NavbarBottom";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full">
        <NavbarTop />
        <NavbarBottom />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

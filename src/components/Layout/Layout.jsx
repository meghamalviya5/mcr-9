import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles.css";

const Layout = () => {
  return (
    <div className="wrapper">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

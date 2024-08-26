"use client";
import React, { useState } from "react";

import { IoIosMenu } from "react-icons/io";
import Sidebar from "./Sidebar/sidebar";
import SearchBar from "./Searchbar/Searchbar";
import Notification from "./Notification/notification";
import UserDropdownMenu from "./UserDropdown/userdropdown";
import UserInfo from "./UserInfo/userinfo";

export default function AdminWrapper({ children }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="container-xxl position-relative  d-flex p-0">
      <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

      <div className={`content ${!sideBarOpen ? "open" : ""}`}>
        <nav className="navbar navbar-expand sticky-top px-4 py-0 toogle-nav mt-4">
          <span
            className="sidebar-toggler flex-shrink-0 pointer"
            onClick={() => setSideBarOpen(!sideBarOpen)}
          >
            <IoIosMenu />
          </span>
        </nav>
        <div className="container-fluid pt-4 px-4">
          <div className="row ">
            <UserInfo />
            <div className="col-sm-7  col-md-6 text-center">
              <div className="d-flex align-items-center gap-4 justify-content-end">
                <SearchBar />
                <Notification />

                <UserDropdownMenu />
              </div>
            </div>
            <div className="d-flex"></div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

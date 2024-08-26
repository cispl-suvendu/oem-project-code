"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/src/assets/logo.svg";
import { navmenu } from "@/src/constants/authNav";

export default function Navbar() {
  const pathname = usePathname();
  const [navItem, setNavItem] = useState([] as { name: string; url: string }[]);

  useEffect(() => {
    if (pathname) {
      const items = navmenu.filter(
        (item) => item.url.toString() !== pathname.toString()
      );
      setNavItem(items);
    }
  }, [pathname]);

  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          <Image src={Logo} alt="logo" height={200} width={200} />
        </a>
        <button className="navbar-toggler" type="button">
          <span
            className="navbar-toggler-icon"
            style={{ fontSize: "30px", cursor: "pointer" }}
          ></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="mynavbar"
        >
          <ul className="navbar-nav">
            {navItem.map((item, idx) => (
              <li key={idx} className={`nav-item`}>
                <Link className="nav-link" href={item.url}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="">
            <Link
              href="/register"
              className="custom-btn rounded-pill btn btn-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

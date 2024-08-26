"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/src/assets/logo.svg";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaClipboardList, FaUserGraduate } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { usePathname } from "next/navigation";

const menuOptions = [
  {
    name: "Categories",
    url: "/categories",
    icon: <BiSolidCategory />,
  },
  {
    name: "Questionnaires",
    url: "/questions",
    icon: <BsFillQuestionSquareFill />,
  },
  {
    name: "Exams",
    url: "/exams",
    icon: <FaClipboardList />,
  },
  {
    name: "Users",
    url: "/users",
    icon: <FaUserGraduate />,
  },
  {
    name: "Leaderboard",
    url: "/leaderboard",
    icon: <MdLeaderboard />,
  },
];

export default function Sidebar({ sideBarOpen, setSideBarOpen }) {
  const pathname = usePathname();
  return (
    <div className={`sidebar pe-4 pb-3 ${!sideBarOpen ? "open" : ""}`}>
      <nav className="navbar">
        <Link href="/dashboard" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <Image alt="logo" height={400} width={400} src={Logo} />
          </h3>
        </Link>
        <div className="navbar-nav w-100">
          <ul>
            {menuOptions.map((item) => (
              <li key={item.name}>
                <Link
                  key={item.name}
                  href={item.url}
                  className={`nav-item nav-link ${
                    pathname === item.url ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="user-log-out">
            <Link href="/settings" className="nav-item nav-link">
              <span className="nav-icon">
                <IoSettings />
              </span>
              <span className="nav-label">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

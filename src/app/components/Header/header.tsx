import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/logo.svg";
import close from "@/src/assets/close.svg";


export default function Navbar(){

    return (
        <>

        <div className="navigation py-4 py-sm-5">
          <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
              <Link className="navbar-brand" href="">
                {" "}
                <Image alt="loading" height={300} width={300} src={logo} />
              </Link>
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
                  <li className="nav-item">
                    <Link className="nav-link" href="/Questions">
                      Questions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/Explore">
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/login">
                      Login
                    </Link>
                  </li>
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
          <div id="mySidenav" className="sidenav">
            <Link href="" className="closebtn">
              <Image alt="loading" height={400} width={400} src={close} />
            </Link>
            <div className="submenu">
              <Link href="/Questions">Questions</Link>
              <Link href="/Explore">Explore</Link>
              <Link href="/login">LogIn</Link>
            </div>
          </div>
        </div>
        </>
        
    )
}
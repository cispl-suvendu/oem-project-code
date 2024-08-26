import Link from "next/link"
import Image from "next/image"
import fb from "@/src/assets/fb.svg";
import twt from "@/src/assets/twit.svg";
import ld from "@/src/assets/link.svg";
import ins from "@/src/assets/insta.svg";
import logo from "@/src/assets/logo.svg";


export default function MasterFooter(){

    return (


        <>
        <div className="footer pt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="footer-left">
                <Image alt="loading" height={200} width={200} src={logo} />
                <div className="footer-left-info">
                  <h4>Address:</h4>
                  <p>
                    Globsyn Crystals, Tower II, Level - 1, EP Block,
                    <br />
                    Sector V, Kolkata, West Bengal 700091, India
                  </p>
                </div>
                <div className="footer-left-info">
                  <h4>Contact:</h4>
                  <Link href="tel:G033 4062 4140">G033 4062 4140</Link>
                  <br />
                  <Link href="mailto:support@codeclouds.com">
                    support@codeclouds.com
                  </Link>
                </div>
                <div className="social-link d-flex">
                  <Link href="#">
                    <Image alt="loading" height={50} width={50} src={fb} />
                  </Link>
                  <Link href="#">
                    <Image alt="loading" height={50} width={50} src={ins} />
                  </Link>
                  <Link href="#">
                    <Image alt="loading" height={50} width={50} src={twt} />
                  </Link>
                  <Link href="#">
                    <Image alt="loading" height={50} width={50} src={ld} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-link">
                <ul>
                  <li>
                    <Link href="#">About Us</Link>
                  </li>
                  <li>
                    <Link href="#">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#">Careers</Link>
                  </li>
                  <li>
                    <Link href="#">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="#">Terms and conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-link">
                <ul>
                  <li>
                    <Link href="#">Tests</Link>
                  </li>
                  <li>
                    <Link href="#">Company wise</Link>
                  </li>
                  <li>
                    <Link href="#">How to begin?</Link>
                  </li>
                  <li>
                    <Link href="#">Test wise</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="legal d-flex justify-content-between">
            <div>
              <p>2022 Leet Code. All right reserved.</p>
            </div>
            <div>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
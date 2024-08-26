import Image from "next/image";
import learn2 from "@/src/assets/learn2.svg";
import learn from "@/src/assets/learnimg.svg";
import hero from "@/src/assets/hero.png";
import Link from "next/link";
import MasterFooter from "./components/Footer/footer";
import Navbar from "./components/Header/header";

export default function Home() {
  return (
    <>
      <div className="container">
        {/* <MasterHeader/> */}
        <Navbar />
        <div className="log-body landing-content">
          <div className="row landing-top-gap">
            <div className="col-sm-12 col-md-6 order-2 order-md-1">
              <div className="top-right">
                <h1>
                  A <span>New Way</span> to grow
                </h1>
                <p>
                  Codeclouds Exam is the best platform to help you Explore your
                  skills, expand your knowledge and appear technical interviews.
                </p>
                <a
                  href="/register"
                  className="custom-btn rounded-pill btn btn-lg"
                >
                  Create Account
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 order-1 order-md-2">
              <div className="heros">
                <Image alt="loading" height={500} width={500} src={hero} />
              </div>
            </div>
          </div>
          <div className="zigzag">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="lrnimg">
                  <Image alt="loading" height={500} width={500} src={learn} />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="learn-con">
                  <h5>Express & Explore</h5>
                  <h1>Companies & Candidates</h1>
                  <p>
                    Not only does CodeClouds Test System arrange the technical
                    interviews, we also help colleges identify top technical
                    talent. From sponsoring contests to providing online
                    assessments, we offer numerous services to businesses.
                  </p>
                  <Link href="#" className="custom-btn rounded-pill btn btn-lg">
                    Business Opportunities
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="zigzag">
            <div className="row align-items-center">
              <div className="col-sm-12 col-md-6 order-2 order-md-1">
                <div className="learn-con">
                  <h1>Questions, Community & Contests</h1>
                  <p>
                    Over 2800 questions for the interviews. Come and join one of
                    the largest tech communities with hundreds of thousands of
                    active users and participate in our contests to challenge
                    yourself and earn rewards.
                  </p>
                  <Link
                    href="#"
                    className="custom-btn rounded-pill btn btn-lg bg-transparent-cus"
                  >
                    View Questions
                  </Link>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 order-1 order-md-2">
                <div className="lrnimg">
                  <Image
                    alt="loading"
                    height={500}
                    width={500}
                    className="position-static m-0"
                    src={learn2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footer pt-5">
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
      </div> */}
      <MasterFooter />
    </>
  );
}

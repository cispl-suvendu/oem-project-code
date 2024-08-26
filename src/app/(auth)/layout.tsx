import Image from "next/image";

import Learning from "@/src/assets/learning.svg";
import Navbar from "../components/Header/header";
import MasterFooter from "../components/Footer/footer";


export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
        <>
        <div className="container">
        
            {/* <Navbar /> */}
            <Navbar/>
 
          <div className="log-body">
            <div className="row align-items-center">
              <div className="col-sm-7">
                <Image src={Learning} alt="logo" height={900} width={900} />
              </div>
              <div className="col-sm-5">
                {children}
              </div>
            </div>
          </div>
         
        </div>
        
        <MasterFooter/>
        </>
  );
}

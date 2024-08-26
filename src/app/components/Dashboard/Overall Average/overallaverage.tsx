import Image from "next/image";
import pers from "@/src/assets/pers.svg";

export default function OverallAverage() {

    return (


        <>
                 <div className="persntg persntg-gp  bg-white">
                  <div className="d-flex align-items-center gap-4">
                    <Image src={pers} alt="loading" height={100} width={100} />
                    <div>
                      <h1>%80</h1>
                      <p>Overall Average</p>
                    </div>
                  </div>
                </div>
        </>
    )
}
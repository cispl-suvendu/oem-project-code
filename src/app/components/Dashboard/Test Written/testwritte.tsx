import Image from "next/image"
import pen from "@/src/assets/pen.svg";

export default function TestWritten () {

    return (

        
        <>
                  <div className="persntg bg-white">
                  <div className="d-flex align-items-center gap-4">
                    <Image src={pen} alt="loading" height={100} width={100} />
                    <div>
                      <h1>32</h1>
                      <p>Tests Written</p>
                    </div>
                  </div>
                </div>
        </>
    )
}
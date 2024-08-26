import Image from "next/image"
import s1 from "@/src/assets/s1.png";
import s2 from "@/src/assets/s2.png";

export default function RecentTests () {

    return (
        <>
        
        <div className="recent-test">
            <h1>
              <i className="fa fa-edit"></i>Recent Tests
            </h1>
          </div>
          <div className="test-list center slider d-flex">
            <div className="slider-item">
              <Image src={s1} alt="loading" height={250} width={280} />
            </div>
            <div className="slider-item">
              <Image src={s2} alt="loading" height={250} width={280} />
            </div>
          </div>
        </>

    )
}
import Image from "next/image"
import bag from "@/src/assets/bag.svg";
import like from "@/src/assets/like.svg";
import dislike from "@/src/assets/dislike.svg";
import star from "@/src/assets/star.svg";


export default function ExamResult() {

    return (


        <div className="bg-white exam-results">
        <div className="d-flex align-items-center gap-4 mb-4">
          <Image src={bag} alt="loading" height={100} width={100} />
          <div className="result-info">
            <h1>32</h1>
            <p>No of Tests</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-4 mb-4">
          <Image src={like} alt="loading" height={100} width={100} />
          <div className="result-info">
            <h1>12</h1>
            <p>Passed</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-4 mb-4">
          <Image
            src={dislike}
            alt="loading"
            height={100}
            width={100}
          />
          <div className="result-info">
            <h1>19</h1>
            <p>Passed</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-4 mb-4">
          <Image src={star} alt="loading" height={100} width={100} />
          <div className="result-info">
            <h1>1</h1>
            <p>Waiting for result</p>
          </div>
        </div>
      </div>
    )
}
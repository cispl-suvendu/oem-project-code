import Image from "next/image"
import cal from "@/src/assets/cal.svg";

export default function UpcomingExam(){

    return (


        <>
             <div className="exam-date bg-white d-flex flex-column justify-content-center  align-items-center">
            <h5>Upcoming Exam</h5>
            <Image src={cal} alt="loading" height={200} width={200} />
            <h4>12th June, 2024</h4>
            <a className="rounded-pill" href="#">
              Register Now
            </a>
          </div>
        
        </>
    )
}
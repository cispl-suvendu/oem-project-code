import React, { useContext } from "react";
import RecentTests from "@/src/app/components/Dashboard/RecentTest/recentTest";
import UpcomingExam from "@/src/app/components/Dashboard/UpcomingExam/upcomingexa";
import LeaderBoard from "@/src/app/components/Dashboard/LeaderBoard/leaderboard";
import TestWritten from "@/src/app/components/Dashboard/Test Written/testwritte";
import OverallAverage from "@/src/app/components/Dashboard/Overall Average/overallaverage";
import ExamResult from "@/src/app/components/Dashboard/ExamResults/examresults";



export default function Dashboard() {
  return (
    <div className="main-con my-5">
      <div className="row">
        <div className="col-sm-6">

          <RecentTests />
          <UpcomingExam />
        </div>
        <div className="col-sm-6">
          <LeaderBoard />
          <div className="exam-info">
            <div className="row">
              <div className="col-sm-8">
                <TestWritten />
                <OverallAverage />
              </div>
              <div className="col-sm-4">
                <ExamResult />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

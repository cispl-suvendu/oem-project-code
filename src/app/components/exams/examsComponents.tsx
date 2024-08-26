import LoadingUser from "../Skeleton/LoadingUser";
import AlertStatus from "../Alert/AlertStatus";
import ExamCard from "./examCard";
import { fetchExamInterface } from "../../interfaces/Exam";

export default function ExamComponent({
  isLoading,
  allExams,
  handleEdit,
  handleRefetch,
  allUsers,
  fetchCount
}) {
  return (
    <>
      <div className="user_table_holder mt-4">
        {isLoading ? (
          <LoadingUser />
        ) : allExams.length > 0 ? (
          <table className="table table-hover common_table">
            <thead>
              <tr className="table-primary">
                <th>Name</th>
                <th>Status</th>
                <th>Number Question</th>
                <th>Allocated times</th>
                <th>Action</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {allExams.map((item: fetchExamInterface) => (
                <ExamCard
                  key={item.exam_id}
                  exam={item}
                  handleEdit={handleEdit}
                  handleRefetch={handleRefetch}
                  allUsers={allUsers}
                  fetchCount={fetchCount}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <AlertStatus message="No Exam Found!" status="error" />
        )}
      </div>
    </>
  );
}

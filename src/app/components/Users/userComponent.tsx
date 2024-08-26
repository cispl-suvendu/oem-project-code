import { User } from "@/src/app/interfaces/User";
import AlertStatus from "../Alert/AlertStatus";
import LoadingUser from "../Skeleton/LoadingUser";
import UserCard from "./UserCard";

export default function UserComponent({
  allUsers,
  isLoading,
  handleRefetch,
  handleEdit,
  fetchCount
}) {
  return (
    <>
      <div className="user_table_holder mt-4">
        {isLoading ? (
          <LoadingUser />
        ) : allUsers.length > 0 ? (
          <table className="table table-hover common_table">
            <thead>
              <tr className="table-primary">
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user: User) => {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    handleEdit={handleEdit}
                    handleRefetch={handleRefetch}
                    fetchCount={fetchCount}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <AlertStatus message="No User Found!" status="error" />
        )}
      </div>
    </>
  );
}

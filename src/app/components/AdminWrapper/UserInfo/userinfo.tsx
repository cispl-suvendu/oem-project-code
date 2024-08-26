import { useAuthContext } from "@/src/app/context/authcontext";

export default function UserInfo() {
    const {user} = useAuthContext();
    const username = user?.full_name?.split(' ')[0] || '';
    
  return (
    <div className="col-sm-5 col-md-6 user-information">
      <h1>Welcome, {username}</h1>
      <p>Here is your Profile Dashboard </p>
    </div>
  );
}

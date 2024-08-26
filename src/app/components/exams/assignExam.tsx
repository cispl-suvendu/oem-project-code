import React, { useState } from "react";
import Select from "react-select";
import { useAuthContext } from "../../context/authcontext";
import ExamService from "../../services/examsServices";
import usePostData from "../../hooks/usePost";

export default function AssignExam({ allUsers, exam_id, handleModalClose }) {
  const examsServices = new ExamService();
  const useList = allUsers.map((user) => {
    return {
      value: user.id,
      label: user.full_name,
    };
  });
  const { user } = useAuthContext();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isRtl, setIsRtl] = useState(false);
  const [selecttedUser, setSelectedUser] = useState(null);
  const handleChange = (options: any) => {
    setSelectedUser(options);
  };
  const userIds = selecttedUser?.map((i) => i.value);
  const { loading: loadingExam, postData: assignExam } = usePostData(
    examsServices.assignExam,
    (result) => {
      if (result.success) {
        handleModalClose();
      }
    }
  );
  const handleSubmit = () => {
    if (userIds === undefined) return;
    const payload = {
      user_ids: userIds,
      exam_id,
      creator_id: user.id,
    };
    assignExam(payload);
  };
  return (
    <div>
      <h4>Select User</h4>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue="select user"
        isSearchable={isSearchable}
        isClearable={isClearable}
        isRtl={isRtl}
        name="userList"
        options={useList}
        isMulti
        onChange={handleChange}
      />
      {userIds === undefined ? (
        <small className="text-danger">Please select user</small>
      ) : null}
      <button
        type="submit"
        className="btn btn-lg custom-btn rounded-pill custom-btn-new"
        disabled={loadingExam}
        onClick={handleSubmit}
      >
        {loadingExam ? "Loading" : "Submit"}
      </button>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddFormData, EditFormData } from "@/src/app/interfaces/User";
import { userAddformSchema, userEditformSchema } from "@/src/schema/user";
import cryptoRandomString from "crypto-random-string";
import usePostData from "@/src/app/hooks/usePost";
import UserService from "@/src/app/services/userService";
import toast from "react-hot-toast";
import { useFilterContext } from "../../context/filterContext";
const password = cryptoRandomString({ length: 20, type: "alphanumeric" });
export default function UserForm({
  isAddOpen,
  isEditOpen,
  currentUser,
  handleModalClose,
  handleRefetch,
  fetchCount,
}) {
  const userServices = new UserService();
  const { updateFilter, searchText, limit, page, role } = useFilterContext();
  const [editMode, setEditMode] = useState(false);
  const postPayload = useRef<any>({});

  const { loading: loadingUser, postData: createUsers } = usePostData(
    userServices.createUser,
    (result) => {
      if (result.success) {
        const { active } = postPayload.current;
        const payload = { searchText, limit, page, role, active };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  const { loading: loadingEditUser, postData: UpadteUsers } = usePostData(
    userServices.updateUser,
    (result) => {
      if (result.success) {
        const { active } = postPayload.current;
        const payload = { searchText, limit, page, role, active };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  useEffect(() => {
    setEditMode(isEditOpen);
  }, []);

  //const password = cryptoRandomString({ length: 20, type: "alphanumeric" });

  const initialValues: AddFormData | EditFormData = isEditOpen
    ? {
        full_name: currentUser.full_name,
        email: currentUser.email,
        phone_number: currentUser.phone_number.toString(),
        role: currentUser.role.toString(),
        type: currentUser.type.toString(),
        active: currentUser.active.toString(),
        user_id: currentUser.id.toString(),
      }
    : {
        full_name: "",
        email: "",
        phone_number: "",
        active: 1,
        confirmPassword: password,
        password: password,
      };

  const schema = isEditOpen ? userEditformSchema : userAddformSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddFormData | EditFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const currentValues = watch();
  const isChanged =
    JSON.stringify(currentValues) !== JSON.stringify(initialValues);

  const submitForm: SubmitHandler<AddFormData | EditFormData> = (data) => {
    if (isEditOpen) {
      if (isChanged) {
        let payload = { ...data, user_id: currentUser.id };
        UpadteUsers(payload);
        postPayload.current = payload;
      } else {
        toast.error("No changes detected to update!");
      }
    } else {
      let payload = { ...data, active: 1 };
      createUsers(payload);
      postPayload.current = payload;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className="common_form">
        <div className="log-inner" style={{ margin: "10px" }}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              {...register("full_name")}
              className="form-control"
              placeholder="Full Name"
            />
            {errors.full_name && (
              <small className="text-danger">{errors.full_name.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>Email Id</label>
            <input
              type="text"
              {...register("email")}
              className="form-control"
              placeholder="Email Id"
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              {...register("phone_number")}
              className="form-control"
              placeholder="Phone Number"
            />
            {errors.phone_number && (
              <small className="text-danger">
                {errors.phone_number.message}
              </small>
            )}
          </div>

          {!editMode && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                {...register("password")}
                className="form-control"
                placeholder="Password"
                value={password}
                readOnly
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>
          )}

          <div className="form-group">
            <label>User Type</label>
            <select {...register("type")} className="form-control">
              <option value="-1">Select User Type</option>
              <option value="0">External</option>
              <option value="1">Internal</option>
            </select>

            {errors.type && (
              <small className="text-danger">{errors.type.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>User Role</label>
            <select {...register("role")} className="form-control">
              <option value="-1">Select User Role</option>
              <option value="1">Admin</option>
              <option value="0">User</option>
            </select>

            {errors.role && (
              <small className="text-danger">{errors.role.message}</small>
            )}
          </div>
          {editMode && (
            <div>
              <label>User Status</label>
              <select {...register("active")} className="form-control">
                <option value="-1">Select User Status</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
                <option value="0">Deleted</option>
              </select>

              {errors.active && (
                <small className="text-danger">{errors.active.message}</small>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-lg custom-btn rounded-pill custom-btn-new"
            disabled={loadingUser || loadingEditUser}
          >
            {loadingUser || loadingEditUser ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

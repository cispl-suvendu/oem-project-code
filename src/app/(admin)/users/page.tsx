"use client";
import React, { useReducer } from "react";
import HeaderMenu from "../../components/Headermenu/headermenu";
import HdModel from "@/src/app/components/HdModel/HdModel";
import UserForm from "../../components/Users/UserForm";
import UserComponent from "../../components/Users/userComponent";
import { EditFormData } from "../../interfaces/User";
import useFetchData from "../../hooks/useFetch";
import UserService from "../../services/userService";
import { modalReducer, initialState } from "../../services/modelReducer";
import { useFilterContext } from "../../context/filterContext";
import Pagination from "../../components/Pagination/Pagination";

export default function Users() {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const userServices = new UserService();
  const { searchText, limit, page, role } = useFilterContext();
  const {
    data: allUsers,
    loading: loadingUser,
    refetch: fetchUsers,
  } = useFetchData(
    userServices.fetchAllUsers,
    { searchText, active:1, limit, page, role },
    (result) => result
  );

  const { data: userCount, refetch: fetchUsersCount } = useFetchData(
    userServices.fetchUsersCount,
    { searchText, active:1, limit, page, role },
    (result) => result
  );

  const handleAdd = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "add", title: "Add User" },
    });
  };

  const handleEdit = (item: EditFormData) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "edit", title: "Edit User", data: item },
    });
  };

  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <HeaderMenu
        type="User"
        handleOpen={handleAdd}
        addButton="User"
        filter={fetchUsers}
        fetchCount={fetchUsersCount}
      />

      <HdModel
        handleModelOpen={state.isModalOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <UserForm
          isAddOpen={state.isAddOpen}
          isEditOpen={state.isEditOpen}
          currentUser={state.data}
          handleModalClose={handleModalClose}
          handleRefetch={fetchUsers}
          fetchCount={fetchUsersCount}
        />
      </HdModel>

      <UserComponent
        allUsers={allUsers}
        isLoading={loadingUser}
        handleEdit={handleEdit}
        handleRefetch={fetchUsers}
        fetchCount={fetchUsersCount}
      />
      <Pagination countData={userCount} handleRefetch={fetchUsers} />
    </>
  );
}

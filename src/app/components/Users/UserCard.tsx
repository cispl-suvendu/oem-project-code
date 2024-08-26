import React, { useReducer } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import HdModel from "../HdModel/HdModel";
import { modalReducer, initialState } from "@/src/app/services/modelReducer";
import usePostData from "@/src/app/hooks/usePost";
import UserService from "@/src/app/services/userService";
import DeleteConfirmation from "../Confirmation/DeleteConfirmation";
import { getStatus } from "@/src/app/services/getStatus";
import { SlOptionsVertical } from "react-icons/sl";
import { useFilterContext } from "../../context/filterContext";

export default function UserCard({
  user,
  handleEdit,
  handleRefetch,
  fetchCount,
}) {
  const { full_name, id, phone_number, role, active, type, email } = user;
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const {
    updateFilter,
    searchText,
    limit,
    page,
    role: userRole,
  } = useFilterContext();
  const userServices = new UserService();
  const { postData: deleteUser } = usePostData(
    userServices.deleteUser,
    (result) => {
      if (result.success) {
        const payload = { role: userRole, active: 0, searchText, limit, page };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
      }
    }
  );
  const handleDelete = () => {
    dispatch({
      type: "DELETE_MODAL",
    });
  };
  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <>
      <tr>
        <td>{full_name}</td>
        <td>{email}</td>
        <td>{phone_number}</td>
        <td>{role ? "ADMIN" : "USER"}</td>
        <td>{type ? "Internal" : "External"}</td>
        <td>{getStatus(active)}</td>
        <td>
          <Menu>
            <MenuButton>
              <SlOptionsVertical />
            </MenuButton>
            <MenuItems>
              <ul>
                <li>
                  <MenuItem>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                  </MenuItem>
                </li>
                <li>
                  <MenuItem>
                    <button onClick={() => handleDelete()}>delete</button>
                  </MenuItem>
                </li>
              </ul>
            </MenuItems>
          </Menu>
          <HdModel
            handleModelOpen={state.isDeleteOpen}
            handleModelClose={handleModalClose}
            HdTitle={state.titleText}
          >
            <DeleteConfirmation
              itemName={full_name}
              itemId={id}
              handleDelete={deleteUser}
              handleDeleteClose={handleModalClose}
            />
          </HdModel>
        </td>
      </tr>
    </>
  );
}

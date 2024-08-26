import React, { useReducer } from "react";
import { getStatus } from "../../services/getStatus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { modalReducer, initialState } from "../../services/modelReducer";
import HdModel from "../HdModel/HdModel";
import DeleteConfirmation from "../Confirmation/DeleteConfirmation";
import usePostData from "../../hooks/usePost";
import ExamService from "../../services/examsServices";
import AssignExam from "./assignExam";
import { useFilterContext } from "../../context/filterContext";

export default function ExamCard({
  exam,
  handleEdit,
  handleRefetch,
  allUsers,
  fetchCount,
}) {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const examsServices = new ExamService();
  const { searchText, limit, page, updateFilter } = useFilterContext();
  const {
    active,
    cat_id,
    complexity,
    exam_creation_date,
    exam_duration,
    exam_given_date,
    exam_id,
    exam_link,
    question_ids,
    questions_count,
    status,
    sub_cat_id,
    title,
    user_id,
  } = exam;

  const { postData: deleteExam } = usePostData(
    examsServices.deleteExam,
    (result) => {
      if (result.success) {
        const payload = { searchText, limit, page, active: 0 };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
      }
    }
  );

  const handleAdd = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "add", title: "Assign Exam" },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_MODAL",
    });
  };
  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <tr key={exam.exam_id} className="">
      <td>{title}</td>
      <td>{getStatus(active)}</td>
      <td>{questions_count}</td>
      <td>{exam_duration}</td>
      <td>
        <Menu>
          <MenuButton>
            <SlOptionsVertical />
          </MenuButton>
          <MenuItems>
            <ul>
              <li>
                <MenuItem>
                  <button onClick={() => handleAdd()}>Assign Exam</button>
                </MenuItem>
              </li>
              <li>
                <MenuItem>
                  <button onClick={() => handleEdit(exam)}>Edit</button>
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
            itemName={title}
            itemId={exam_id}
            handleDelete={deleteExam}
            handleDeleteClose={handleModalClose}
          />
        </HdModel>
        <HdModel
          handleModelOpen={state.isAddOpen}
          handleModelClose={handleModalClose}
          HdTitle={state.titleText}
        >
          <AssignExam
            allUsers={allUsers}
            exam_id={exam_id}
            handleModalClose={handleModalClose}
          />
        </HdModel>
      </td>
    </tr>
  );
}

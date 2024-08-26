import React, { useReducer } from "react";
import getComplexity from "../../services/getComplexity";
import { getStatus } from "../../services/getStatus";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import HdModel from "../HdModel/HdModel";
import DeleteQuestionConfirmation from "../Confirmation/DeleteQuestionConfirmation";
import { modalReducer, initialState } from "../../services/modelReducer";
import usePostData from "../../hooks/usePost";
import questionService from "../../services/questionService";
import { useFilterContext } from "../../context/filterContext";

export default function QuestionsCard({
  item,
  handleEditOpen,
  handleRefetch,
  fetchCount,
}) {
  const { searchText, limit, page, updateFilter } = useFilterContext();
  const {
    active,
    category_name,
    complexity,
    full_name,
    id,
    options,
    question,
    right_option,
    sub_category_name,
  } = item;
  const { postData: deleteQuestion } = usePostData(
    questionService.removeQuestion,
    (result) => {
      if (result.success) {
        const payload = { searchText, limit, page, active: 0 };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
      }
    }
  );
  const [state, dispatch] = useReducer(modalReducer, initialState);

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
      <div className="question_added_block col-md-4 mb-4">
        <div className="question_added_inner  p-4">
          <div className="question_added_inner_link">
            <div>
              <div className="badges">
                <span>{getStatus(active)}</span>
              </div>
              <h5>{question}</h5>
              <ul>
                <li>{getComplexity(complexity)}</li>
                <li>{category_name}</li>
                <li>{sub_category_name}</li>
                <li>{full_name}</li>
              </ul>
            </div>
          </div>

          <div className="question_meta">
            <button onClick={() => handleEditOpen(item)}>
              <MdOutlineEdit />
            </button>
            {active !== 0 && (
              <button onClick={() => handleDelete()}>
                <MdDeleteOutline />
              </button>
            )}
          </div>
        </div>
      </div>
      <HdModel
        handleModelOpen={state.isDeleteOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <DeleteQuestionConfirmation
          itemName={question}
          itemId={id}
          handleDelete={deleteQuestion}
          handleDeleteClose={handleModalClose}
        />
      </HdModel>
    </>
  );
}

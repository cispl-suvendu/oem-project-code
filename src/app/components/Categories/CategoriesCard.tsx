import React, { useReducer } from "react";
import Link from "next/link";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import HdModel from "../HdModel/HdModel";
import DeleteConfirmation from "../Confirmation/DeleteConfirmation";
import { getStatus } from "../../services/getStatus";
import { modalReducer, initialState } from "../../services/modelReducer";
import usePostData from "../../hooks/usePost";
import categoryService from "../../services/categoryService";
import { useFilterContext } from "../../context/filterContext";

export default function CategoriesCard({
  item,
  handleEditCategory,
  handleRefetch,
  fetchCount,
}) {
  const { id, category_name, cat_slug, cat_description, active } = item;
  const { updateFilter, searchText, limit, page } = useFilterContext();
  const { postData: deleteCategories } = usePostData(
    categoryService.removeCategories,
    (result) => {
      if (result.success) {
        const payload = { active: 0, searchText, limit, page };
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
      <div className="col-sm-3">
        <div className="card category-item p-4 category-item-block">
          <Link href={`categories/${id}`}>
            <div className="badges">
              <span>{getStatus(active)}</span>
            </div>
            <div className="category_name">{category_name}</div>
          </Link>
          <div className="category_meta">
            <button onClick={() => handleEditCategory(item)}>
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
        <DeleteConfirmation
          itemName={category_name}
          itemId={id}
          handleDelete={deleteCategories}
          handleDeleteClose={handleModalClose}
        />
      </HdModel>
    </>
  );
}

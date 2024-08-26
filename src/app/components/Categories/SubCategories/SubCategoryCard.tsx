import React, { useReducer } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import HdModel from "../../HdModel/HdModel";
import DeleteConfirmation from "../../Confirmation/DeleteConfirmation";
import { getStatus } from "@/src/app/services/getStatus";
import { modalReducer, initialState } from "../../../services/modelReducer";
import usePostData from "@/src/app/hooks/usePost";
import categoryService from "@/src/app/services/categoryService";
import { useFilterContext } from "@/src/app/context/filterContext";

export default function SubCategoriesCard({
  item,
  handleEditOpen,
  handleRefetch,
  fetchCount
}) {
  const { searchText, limit, page, updateFilter } = useFilterContext();
  const { id, sub_category_name, sub_cat_slug, active, catgeory_id } = item;
  const { postData: deleteSubCategories } = usePostData(
    categoryService.removeSubCategories,
    (result) => {
      if (result.success) {
        const payload = {
          cat_id: catgeory_id,
          searchText,
          limit,
          page,
          active: 0,
        };
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
        <div className="card category-item p-4">
          <div className="common_badge">{getStatus(active)}</div>

          <div className="category_name">{sub_category_name}</div>

          <div className="category_meta">
            <button onClick={() => handleEditOpen(item)}>
              <MdOutlineEdit />
            </button>
            <button onClick={() => handleDelete()}>
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>
      <HdModel
        handleModelOpen={state.isDeleteOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <DeleteConfirmation
          itemName={sub_category_name}
          itemId={id}
          handleDelete={deleteSubCategories}
          handleDeleteClose={handleModalClose}
        />
      </HdModel>
    </>
  );
}

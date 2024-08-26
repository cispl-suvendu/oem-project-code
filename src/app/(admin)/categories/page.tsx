"use client";
import React, { useReducer } from "react";
import LoadingCategory from "../../components/Skeleton/LoadingCategory";
import CategoriesCard from "../../components/Categories/CategoriesCard";
import HeaderMenu from "../../components/Headermenu/headermenu";
import HdModel from "../../components/HdModel/HdModel";
import CategoryForm from "../../components/Categories/CategoryForm";
import { ICategory } from "../../interfaces/Category";
import AlertStatus from "../../components/Alert/AlertStatus";
import { modalReducer, initialState } from "../../services/modelReducer";
import useFetchData from "../../hooks/useFetch";
import categoryService from "../../services/categoryService";
import { useFilterContext } from "../../context/filterContext";
import Pagination from "../../components/Pagination/Pagination";

export default function Categories() {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { searchText, limit, page } = useFilterContext();

  const {
    data: categories,
    loading: loadingCat,
    refetch: fetchCategories,
  } = useFetchData(
    categoryService.fetchCategories,
    { searchText, active:1, limit, page },
    (result) => result
  );

  const { data: categoriesCount, refetch: fetchCategoriesCount } = useFetchData(
    categoryService.fetchCategoriesCount,
    { searchText, active:1, limit, page },
    (result) => result
  );

  const handleAddCategory = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "add", title: "Add Category" },
    });
  };

  const handleEditCategory = (item: ICategory) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "edit", title: "Edit Category", data: item },
    });
  };

  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div>
      <HeaderMenu
        addButton="Categories"
        type="Categories"
        handleOpen={handleAddCategory}
        filter={fetchCategories}
        fetchCount={fetchCategoriesCount}
      />
      <div className="row category_card_holder">
        {loadingCat ? (
          <LoadingCategory />
        ) : categories.length > 0 ? (
          categories.map((item) => {
            return (
              <CategoriesCard
                key={item.id}
                {...{
                  item,
                  handleEditCategory,
                  handleRefetch: fetchCategories,
                  fetchCount:fetchCategoriesCount
                }}
              />
            );
          })
        ) : (
          <AlertStatus message="No Category Found!" status="error" />
        )}
      </div>
      <Pagination countData={categoriesCount} handleRefetch={fetchCategories} />
      <HdModel
        handleModelOpen={state.isModalOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <CategoryForm
          isAddOpen={state.isAddOpen}
          isEditOpen={state.isEditOpen}
          categoryInfo={state.data}
          handleModalClose={handleModalClose}
          handleRefetch={fetchCategories}
          fetchCount={fetchCategoriesCount}
        />
      </HdModel>
    </div>
  );
}

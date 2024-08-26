"use client";
import HeaderMenu from "@/src/app/components/Headermenu/headermenu";
import { useReducer } from "react";
import LoadingSubCatHeader from "@/src/app/components/Skeleton/LoadingSubCatHeader";
import HdModel from "@/src/app/components/HdModel/HdModel";
import LoadingCategory from "@/src/app/components/Skeleton/LoadingCategory";
import SubCategoriesCard from "@/src/app/components/Categories/SubCategories/SubCategoryCard";
import SubCategoryForm from "@/src/app/components/Categories/SubCategories/SubcategoryForm";
import { ISubCategory } from "@/src/app/interfaces/Category";
import AlertStatus from "@/src/app/components/Alert/AlertStatus";
import { modalReducer, initialState } from "@/src/app/services/modelReducer";
import useFetchData from "@/src/app/hooks/useFetch";
import categoryService from "@/src/app/services/categoryService";
import { useFilterContext } from "@/src/app/context/filterContext";
import Pagination from "@/src/app/components/Pagination/Pagination";

export default function Page({ params }: { params: { subcat: string } }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { searchText, active, limit, page } = useFilterContext();

  const { data: singleCategorie, loading: loadingCatSingle } = useFetchData(
    categoryService.fetchCategoryById,
    parseInt(params.subcat),
    (result) => result
  );

  const {
    data: subCategories,
    loading: loadingSubCat,
    refetch: filterSubCategory,
  } = useFetchData(
    categoryService.filterSubCategory,
    { searchText, active: 1, limit, page, cat_id: parseInt(params.subcat) },
    (result) => result
  );

  const { data: subCategoriesCount, refetch: fetchSubCategoryCount } =
    useFetchData(
      categoryService.fetchSubCategoryCount,
      { searchText, active: 1, limit, page, cat_id: parseInt(params.subcat) },
      (result) => result
    );

  const handleAddCategory = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "add", title: "Add Sub Category" },
    });
  };

  const handleEditCategory = (item: ISubCategory) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "edit", title: "Edit Sub Category", data: item },
    });
  };

  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <div>
        {loadingCatSingle ? (
          <LoadingSubCatHeader />
        ) : singleCategorie.length > 0 ? (
          <>
            <HeaderMenu
              type={singleCategorie[0].category_name}
              addButton="Sub Categroy"
              handleOpen={handleAddCategory}
              filter={filterSubCategory}
              fetchCount={fetchSubCategoryCount}
            />
            <div className="sub_cat_details card p-4">
              <h2>{singleCategorie[0].category_name}</h2>
              <p>{singleCategorie[0].cat_description}</p>
            </div>
          </>
        ) : (
          <AlertStatus
            status="error"
            message="No Category Found with this id!"
          />
        )}
      </div>
      {singleCategorie.length > 0 ? (
        <div className="list_sub_cat mt-2">
          <div className="row">
            {loadingSubCat ? (
              <LoadingCategory />
            ) : subCategories.length > 0 ? (
              subCategories.map((item) => {
                return (
                  <SubCategoriesCard
                    key={item.id}
                    item={item}
                    handleEditOpen={handleEditCategory}
                    handleRefetch={filterSubCategory}
                    fetchCount={fetchSubCategoryCount}
                  />
                );
              })
            ) : (
              <AlertStatus status="error" message="No Sub Category Found!" />
            )}
          </div>
        </div>
      ) : null}
      <Pagination
        countData={subCategoriesCount}
        handleRefetch={filterSubCategory}
      />
      <HdModel
        handleModelOpen={state.isModalOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <SubCategoryForm
          cat_id={singleCategorie[0]?.id}
          isAddOpen={state.isAddOpen}
          isEditOpen={state.isEditOpen}
          categoryInfo={state.data}
          handleModalClose={handleModalClose}
          handleRefetch={filterSubCategory}
          fetchCount={fetchSubCategoryCount}
        />
      </HdModel>
    </>
  );
}

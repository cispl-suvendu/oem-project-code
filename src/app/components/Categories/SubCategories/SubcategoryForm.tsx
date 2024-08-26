import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  subCategoryFormSchema,
  editSubCategoryFormSchema,
} from "@/src/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/src/app/context/authcontext";
import toast from "react-hot-toast";
import { statusData } from "@/src/app/services/getStatus";
import usePostData from "@/src/app/hooks/usePost";
import categoryService from "@/src/app/services/categoryService";
import { useFilterContext } from "@/src/app/context/filterContext";

type FormData = {
  sub_cat_name: string;
  sub_cat_slug: string;
};

type EditFormData = FormData & {
  active: string;
};

export default function SubCategoryForm({
  cat_id,
  isEditOpen,
  handleModalClose,
  isAddOpen,
  categoryInfo,
  handleRefetch,
  fetchCount,
}) {
  const { searchText, limit, page, updateFilter } = useFilterContext();
  const postPayload = useRef<any>({});
  const { user } = useAuthContext();

  const { loading: loadingSubCat, postData: updateSubCategorie } = usePostData(
    categoryService.editSubCategory,
    (result) => {
      if (result.success) {
        const { cat_id, active } = postPayload.current;
        const payload = { searchText, active, limit, page, cat_id };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  const { loading: loadingEditSubCat, postData: postSubCategories } =
    usePostData(categoryService.createSubCategory, (result) => {
      if (result.success) {
        const { cat_id, active } = postPayload.current;
        const payload = { searchText, active, limit, page, cat_id };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    });

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setEditMode(isEditOpen);
  }, []);

  const initialValues: FormData | EditFormData = isEditOpen
    ? {
        sub_cat_name: categoryInfo.sub_category_name,
        sub_cat_slug: categoryInfo.sub_cat_slug,
        active: categoryInfo.active.toString(),
      }
    : {
        sub_cat_name: "",
        sub_cat_slug: "",
      };

  const schema = isEditOpen ? editSubCategoryFormSchema : subCategoryFormSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData | EditFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const currentValues = watch();
  const isChanged =
    JSON.stringify(currentValues) !== JSON.stringify(initialValues);

  const submitForm: SubmitHandler<FormData | EditFormData> = (data) => {
    if (isEditOpen) {
      const payload = {
        ...data,
        user_id: user.id,
        cat_id: categoryInfo.catgeory_id,
        sub_cat_id: categoryInfo.id,
        active: parseInt((data as EditFormData).active),
      };
      if (isChanged) {
        updateSubCategorie(payload);
        postPayload.current = payload;
      } else {
        toast.error("No changes detected to update!");
      }
    } else {
      const payload = {
        ...data,
        user_id: user.id,
        cat_id,
      };
      reset();
      postSubCategories(payload);
      postPayload.current = payload;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className="common_form">
        <div className="log-inner" style={{ margin: "10px" }}>
          <label>Sub Category Name</label>
          <input
            type="text"
            {...register("sub_cat_name")}
            className="form-control"
            placeholder="Category Name"
          />
          {errors.sub_cat_name && (
            <small className="text-danger">{errors.sub_cat_name.message}</small>
          )}
        </div>

        <div className="log-inner" style={{ margin: "10px" }}>
          <label>Sub Category Slug</label>
          <input
            type="text"
            {...register("sub_cat_slug")}
            className="form-control"
            placeholder="Category Slug"
          />
          {errors.sub_cat_slug && (
            <small className="text-danger">{errors.sub_cat_slug.message}</small>
          )}
        </div>
        {editMode && (
          <div className="log-inner" style={{ margin: "10px" }}>
            <label>Category Status</label>
            <select {...register("active")} className="form-control">
              {statusData.map((status) => {
                return (
                  <option value={status.id} key={status.id}>
                    {status.name}
                  </option>
                );
              })}
            </select>
            {(errors as FieldErrors<EditFormData>).active && (
              <small className="text-danger">
                {(errors as FieldErrors<EditFormData>).active?.message}
              </small>
            )}
          </div>
        )}
        <button
          className="btn btn-lg custom-btn rounded-pill custom-btn-new"
          disabled={loadingSubCat || loadingEditSubCat}
        >
          {loadingSubCat || loadingEditSubCat ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

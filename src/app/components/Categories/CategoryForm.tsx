import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  categoryFormSchema,
  editCategoryFormSchema,
} from "@/src/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context/authcontext";
import toast from "react-hot-toast";
import { statusData } from "../../services/getStatus";
import categoryService from "../../services/categoryService";
import usePostData from "../../hooks/usePost";
import { useFilterContext } from "../../context/filterContext";

type AddFormData = {
  cat_name: string;
  cat_description: string;
};

type EditFormData = AddFormData & {
  active: string;
};

export default function CategoryForm({
  isAddOpen,
  isEditOpen,
  handleModalClose,
  categoryInfo,
  handleRefetch,
  fetchCount,
}) {
  const [editMode, setEditMode] = useState(false);
  const postPayload = useRef<any>({});
  useEffect(() => {
    setEditMode(isEditOpen);
  }, []);
  const { updateFilter, searchText, limit, page } = useFilterContext();

  const { loading: loadingCat, postData: postCategories } = usePostData(
    categoryService.createCategory,
    (result) => {
      if (result.success) {
        const { active } = postPayload.current;
        const payload = { active, searchText, limit, page };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  const { loading: updateCatLoading, postData: updateCategorie } = usePostData(
    categoryService.editCategory,
    (result) => {
      if (result.success) {
        const { active } = postPayload.current;
        const payload = { active, searchText, limit, page };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  const { user } = useAuthContext();

  const initialValues: AddFormData | EditFormData = isEditOpen
    ? {
        cat_name: categoryInfo.category_name,
        cat_description: categoryInfo.cat_description,
        active: categoryInfo.active.toString(),
      }
    : {
        cat_name: "",
        cat_description: "",
      };

  const schema = isEditOpen ? editCategoryFormSchema : categoryFormSchema;

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
        const payload = {
          ...data,
          user_id: user.id,
          cat_id: categoryInfo.id,
          active: parseInt((data as EditFormData).active),
        };
        updateCategorie(payload);
        postPayload.current = payload;
      } else {
        toast.error("No changes detected to update!");
      }
    } else {
      const payload = {
        ...data,
        user_id: user.id,
        active: 1,
      };
      postCategories(payload);
      postPayload.current = payload;
      reset();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className="common_form">
        <div className="log-inner" style={{ margin: "10px" }}>
          <label>Category Name</label>
          <input
            type="text"
            {...register("cat_name")}
            className="form-control"
            placeholder="Category Name"
          />
          {errors.cat_name && (
            <small className="text-danger">{errors.cat_name.message}</small>
          )}
        </div>

        <div className="log-inner" style={{ margin: "10px" }}>
          <label>Category Description</label>
          <input
            type="text"
            {...register("cat_description")}
            className="form-control"
            placeholder="Category Description"
          />
          {errors.cat_description && (
            <small className="text-danger">
              {errors.cat_description.message}
            </small>
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
          disabled={loadingCat || updateCatLoading}
        >
          {loadingCat || updateCatLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

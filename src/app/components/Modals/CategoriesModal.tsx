"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@chakra-ui/react";
import categoryService from "@/src/app/services/categoryService";
import Modal from "./ParentModal";
import { categoryFormSchema } from "@/src/schema/category";
import { useAuth } from "../../context/authcontext";
import useFetchUser from "../../hooks/useFetchUser";
import usePostData from "../../hooks/usePost";

const initialValues = {
  catName: "",
  catSlug: "",
  catDesc: "",
  active: "", // Optional field for updating
};

export default function CategoriesModal({ id = null }) {

  const [defaultValues, setDefaultValues] = useState({ ...initialValues });
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const { user, loadingUser } = useFetchUser();

  const { loading, postData, success, error } = usePostData(
    id ? categoryService.updateCategory : categoryService.createCategory,
    (response) => {
      if (response.success) {
       


        setTimeout(() => {
          //setIsSuccessAlertVisible(false);
          setIsSuccessAlertVisible(true);
        }, 1000); // Hide the alert after 3 seconds
      } else {
        console.error("Error processing category:", response.message);
      }
    }
  );

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await categoryService.fetchCategoryById(id);
          if (response.success) {
            const { category_name, cat_slug, cat_description, active } =
              response.data[0];

            setValue("catName", category_name);
            setValue("catSlug", cat_slug);
            setValue("catDesc", cat_description);
            setValue("active", active);
          } else {
            console.error("Failed to fetch category:", response.message);
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
      fetchCategory();
    }
  }, [id, setValue]);

  const submitForm = async () => {
    const { catName, catSlug, catDesc, active } = getValues();
    const payload = {
      cat_name: catName,
      cat_description: catDesc,
      cat_slug: catSlug,
      user_id: user?.id,
      ...(id && { cat_id: id }),
      ...(id && { active }), // Only include active if updating
    };

    //await postData(payload);
    
    
  };

  const handleClose = () => {
    
  };

  

  return (
    <>
      <Modal
        isOpen={true}
        onClose={handleClose}
        onSubmit={handleSubmit(submitForm)}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="log-inner" style={{ margin: "10px" }}>
            <label>Category Name</label>
            <input
              type="text"
              {...register("catName", { onChange: () => trigger("catName") })}
              className="form-control"
              placeholder="Category Name"
            />
            {errors.catName && (
              <small className="text-danger">{errors.catName.message}</small>
            )}
          </div>

          <div className="log-inner" style={{ margin: "10px" }}>
            <label>Category Slug</label>
            <input
              type="text"
              {...register("catSlug", { onChange: () => trigger("catSlug") })}
              className="form-control"
              placeholder="Category Slug"
            />
            {errors.catSlug && (
              <small className="text-danger">{errors.catSlug.message}</small>
            )}
          </div>

          <div className="log-inner" style={{ margin: "10px" }}>
            <label>Category Description</label>
            <input
              type="text"
              {...register("catDesc", { onChange: () => trigger("catDesc") })}
              className="form-control"
              placeholder="Category Description"
            />
            {errors.catDesc && (
              <small className="text-danger">{errors.catDesc.message}</small>
            )}
          </div>

          {id && (
            <div className="log-inner" style={{ margin: "10px" }}>
              <label>Active</label>
              <input
                type="text"
                {...register("active", { onChange: () => trigger("active") })}
                className="form-control"
                placeholder="Active"
              />
              {errors.active && (
                <small className="text-danger">{errors.active.message}</small>
              )}
            </div>
          )}
        </form>
      </Modal>
      {isSuccessAlertVisible && (
        <div className="alert alert-success" role="alert">
          Category {id ? "updated" : "added"} successfully!
        </div>
      )}
    </>
  );
}

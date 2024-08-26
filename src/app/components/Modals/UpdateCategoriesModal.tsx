"use client";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testformSchema } from "@/src/schema/admin";
import { MdDataSaverOn } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import usePostData from "@/src/app/hooks/usePost";
import categoryService from "@/src/app/services/categoryService";
import Modal from "./ParentModal";
import { categoryFormSchema } from "@/src/schema/category";
import { useAuth } from "../../context/authcontext";
import useFetchUser from "../../hooks/useFetchUser";

const initialValues = {
  catName: "",
  catSlug: "",
  catDesc: "",
  active : 1,

};

export default function UpdateCategoriesModal({ open, setOpen, id = null}) {
  const [defaultValues, setDefaultValues] = useState({ ...initialValues });
  const {user, loadingUser} = useFetchUser();



  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    trigger,
    // setValue,
  } = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });


const handleUpdate = async () => {

      try{
        console.log("Updating", id)
        const {catName, catSlug, catDesc} = getValues();
        console.log("values", {catName,catSlug,catDesc});
      const payload = {
  
        cat_name : catName,
        cat_description: catSlug,
        cat_slug : catDesc,
        user_id:  user?.id,        
        active:1,
        cat_id: id
      
      }
  
      const response = await categoryService.updateCategory(payload);
      console.log("Update response", response);
    } catch(error){
      console.error("Error updating category:", error.response? error.response.data : error.message);
    }
        setOpen(false);
    }

        const handleClose = () => {
        setOpen(!open);
  };


  return (
    <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit(handleUpdate)}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="log-inner"  style={{margin : "10px"}}>
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
        
        <div className="log-inner" style={{margin : "10px"}}>
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

        <div className="log-inner"  style={{margin : "10px"}}>
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

      </form>
     
    </Modal>
  );
}

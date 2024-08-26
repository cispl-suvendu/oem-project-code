import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/src/app/context/authcontext";
import {
  examCreateInterface,
  examEditInterface,
} from "@/src/app/interfaces/Exam";
import { examSchema } from "@/src/schema/exam";
import { Select } from "@chakra-ui/react";
import { ISubCategory } from "../../interfaces/Category";
import ExamService from "../../services/examsServices";
import usePostData from "../../hooks/usePost";
import { useFilterContext } from "../../context/filterContext";

export default function ExamForm({
  currentExam,
  categories,
  subCategories,
  isAddOpen,
  isEditOpen,
  handleModalClose,
  handleRefetch,
  fetchCount,
}) {
  const examsServices = new ExamService();
  const [editMode, setEditMode] = useState(false);
  const postPayload = useRef<any>({});

  const { updateFilter, searchText, limit, page } = useFilterContext();
  const { loading: loadingExam, postData: createExam } = usePostData(
    examsServices.createExam,
    (result) => {
      if (result.success) {
        const payload = { searchText, limit, page, active: 1 };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  const { loading: loadingEditExam, postData: updateExam } = usePostData(
    examsServices.updateExam,
    (result) => {
      if (result.success) {
        const { active } = postPayload.current;
        const payload = { searchText, limit, page, active };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  useEffect(() => {
    setEditMode(isEditOpen);
  }, []);

  const { user } = useAuthContext();

  const initialValues: examCreateInterface | examEditInterface = isEditOpen
    ? {
        title: currentExam.title,
        creator_id: user.id,
        active: currentExam.active,
        questions_count: currentExam.questions_count,
        exam_duration: currentExam.exam_duration,
        complexity: currentExam.complexity,
        sub_cat_id: currentExam.sub_cat_id,
        exam_id: currentExam.exam_id,
        cat_id: currentExam.cat_id,
      }
    : {
        title: "",
        creator_id: user.id,
        active: 1,
        questions_count: "",
        exam_duration: "",
        complexity: "",
        sub_cat_id: "",
        cat_id: "",
      };

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<examCreateInterface | examEditInterface>({
    resolver: zodResolver(examSchema),
    defaultValues: initialValues,
  });

  const [sub_cats, setSubCat] = useState<ISubCategory[]>([]);

  const submitForm: SubmitHandler<
    examCreateInterface | examEditInterface
  > = async (data) => {
    if (isEditOpen) {
      let payload = { ...data, user_id: currentExam.exam_id };
      updateExam(payload);
      postPayload.current = payload;
    } else {
      let payload = { ...data, active: 1 };
      createExam(payload);
      postPayload.current = payload;
    }
  };

  const selectSubCategory = (cat_id) => {
    let filter_sub_cats = subCategories.filter((item) => {
      return item.catgeory_id == cat_id;
    });
    setSubCat(filter_sub_cats);
  };

  useEffect(() => {
    if (currentExam?.cat_id) {
      selectSubCategory(currentExam?.cat_id);
      setTimeout(() => setValue("sub_cat_id", currentExam?.sub_cat_id), 700);
    }
  }, [isEditOpen]);

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className="common_form">
        <input type="hidden" name="creator_id" value={user.id} />
        <div className="log-inner" style={{ margin: "10px" }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              {...register("title")}
              className="form-control"
              placeholder="Exam Title"
            />
            {errors.title && (
              <small className="text-danger">{errors.title.message}</small>
            )}
          </div>
          <div className="form-group">
            <label>Categories</label>
            <Select
              placeholder="Categories"
              {...register("cat_id")}
              onChange={(e) => selectSubCategory(e.target.value)}
            >
              {categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.category_name}
                  </option>
                );
              })}
            </Select>

            {errors.cat_id && (
              <small className="text-danger">{errors.cat_id.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>Sub Categories</label>
            <Select placeholder="Sub Categories" {...register("sub_cat_id")}>
              {sub_cats.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.sub_category_name}
                  </option>
                );
              })}
            </Select>

            {errors.sub_cat_id && (
              <small className="text-danger">{errors.sub_cat_id.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>Complexity</label>
            <Select placeholder="Exam Complexity" {...register("complexity")}>
              <option value="0">Easy</option>
              <option value="1">Moderate</option>
              <option value="2">Complex</option>
              <option value="3">Pro</option>
            </Select>

            {errors.complexity && (
              <small className="text-danger">{errors.complexity.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>Question Count</label>
            <Select
              placeholder="Select Question Count"
              {...register("questions_count")}
            >
              <option value="30">30 Questions</option>
              <option value="50">50 Questions</option>
              <option value="75">75 Questions</option>
            </Select>

            {errors.questions_count && (
              <small className="text-danger">
                {errors.questions_count.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Exam Duration</label>
            <Select
              placeholder="Exam Duration ( In Minutes )"
              {...register("exam_duration")}
            >
              <option value="30">30 Minutes</option>
              <option value="50">50 Minutes</option>
              <option value="75">75 Minutes</option>
            </Select>

            {errors.exam_duration && (
              <small className="text-danger">
                {errors.exam_duration.message}
              </small>
            )}
          </div>

          {editMode && (
            <div>
              <Select placeholder="Select Active" {...register("active")}>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
                <option value="0">Deleted</option>
              </Select>

              {errors.active && (
                <small className="text-danger">{errors.active.message}</small>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-lg custom-btn rounded-pill custom-btn-new"
            disabled={loadingExam || loadingEditExam}
          >
            {loadingExam || loadingEditExam ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

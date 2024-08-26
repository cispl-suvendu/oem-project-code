import React, { useEffect, useRef } from "react";
import { useAuthContext } from "../../../context/authcontext";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddQuestionFormSchema,
  editQuestionFormSchema,
} from "@/src/schema/question";
import { ComplexityData } from "../../../services/getComplexity";
import toast from "react-hot-toast";
import { statusData } from "../../../services/getStatus";
import { ISubCategory } from "@/src/app/interfaces/Category";
import usePostData from "@/src/app/hooks/usePost";
import questionService from "@/src/app/services/questionService";
import { useFilterContext } from "@/src/app/context/filterContext";

type AddFormData = {
  question: string;
  q_right_opt: string;
  q_opt: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  cat_id: string;
  sub_cat_id: string;
  user_id: number;
  complexity: string;
};

type EditFormData = AddFormData & {
  active: string;
};

export default function CustomQuestionFormm({
  questionInfo,
  allCategories,
  allSubCategories,
  currentSubcatList,
  setCurrentSubCatList,
  currentCat,
  setCurrentCat,
  editMode,
  isEditOpen,
  handleModalClose,
  handleRefetch,
  fetchCount,
}) {
  const postPayload = useRef<any>({});
  const { updateFilter, searchText, limit, page, active } = useFilterContext();

  const { loading: loadingQuestion, postData: postQuestion } = usePostData(
    questionService.createQuestion,
    (result) => {
      if (result.success) {
        const payload = { searchText, limit, page, active };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );

  const { loading: loadingEditQuestion, postData: updateQuestion } =
    usePostData(questionService.editQuestion, (result) => {
      if (result.success) {
        const { active } = postPayload.current;
        const payload = { searchText, limit, page, active };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    });

  const { user } = useAuthContext();

  /**  Sub Category list for Add mode **/
  const getSubCategory = (cat_id: string) => {
    const temp = allSubCategories.filter(
      (subcat: ISubCategory) => subcat.catgeory_id === parseInt(cat_id)
    );
    setCurrentSubCatList(temp);
    setCurrentCat(parseInt(cat_id));
  };

  /**  Sub Category list for Edit mode **/

  const getSubCatListForEdit = () => {
    const temp = allSubCategories.filter(
      (subcat: ISubCategory) => subcat.catgeory_id === questionInfo.cat_id
    );
    setCurrentSubCatList(temp);
  };

  useEffect(() => {
    if (editMode) {
      getSubCatListForEdit();
    }
  }, [editMode]);

  /**  convert Questions Options from JSON for edit mode  **/

  const getQuestionOption = (options: string) => {
    const option = JSON.parse(options);
    return option;
  };

  /**  initial Values for add and edit  **/
  const initialValues: AddFormData | EditFormData = isEditOpen
    ? {
        question: questionInfo.question,
        q_right_opt: questionInfo.right_option,
        q_opt: {
          a: getQuestionOption(questionInfo?.options).a,
          b: getQuestionOption(questionInfo?.options).b,
          c: getQuestionOption(questionInfo?.options).c,
          d: getQuestionOption(questionInfo?.options).d,
        },
        cat_id: questionInfo.cat_id.toString(),
        sub_cat_id:
          questionInfo.cat_id === currentCat
            ? questionInfo.sub_cat_id.toString()
            : null,
        complexity: questionInfo.complexity.toString(),
        user_id: questionInfo.user_id,
        active: questionInfo.active.toString(),
      }
    : {
        question: "",
        q_right_opt: "",
        q_opt: {
          a: "",
          b: "",
          c: "",
          d: "",
        },
        cat_id: "-1",
        sub_cat_id: "-1",
        complexity: "-1",
        user_id: user ? user.id : -1,
      };

  const schema = isEditOpen ? editQuestionFormSchema : AddQuestionFormSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddFormData | EditFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  /** Reset sub category if category changes in edit mode **/

  useEffect(() => {
    if (editMode && currentCat !== questionInfo?.cat_id) {
      setValue("sub_cat_id", "-1");
    }
  }, [currentCat, editMode, setValue, questionInfo]);

  const currentValues = watch();
  const isChanged =
    JSON.stringify(currentValues) !== JSON.stringify(initialValues);

  const submitForm: SubmitHandler<AddFormData | EditFormData> = (data) => {
    if (isEditOpen) {
      if (isChanged) {
        const payload = {
          ...data,
          user_id: user.id,
          cat_id: parseInt(data.cat_id),
          sub_cat_id: parseInt(data.sub_cat_id),
          active: parseInt((data as EditFormData).active),
          complexity: parseInt((data as EditFormData).complexity),
          q_id: questionInfo.id,
        };
        updateQuestion(payload);
        postPayload.current = payload;
      } else {
        toast.error("No changes detected to update!");
      }
    } else {
      const payload = {
        ...data,
        cat_id: parseInt(data.cat_id),
        sub_cat_id: parseInt(data.sub_cat_id),
        complexity: parseInt((data as AddFormData).complexity),
        user_id: user.id,
      };
      reset();
      postQuestion(payload);
      postPayload.current = payload;
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="questionadd">
      <div className="form-row row selectcatregory_dropdown my-4">
        <div className="col-md-6">
          <select
            className="form-select"
            {...register("cat_id")}
            onChange={(e) => getSubCategory(e.target.value)}
          >
            <option value="-1">Select Category</option>
            {allCategories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
          {errors.cat_id && (
            <small className="text-danger w-100">{errors.cat_id.message}</small>
          )}
        </div>

        <div className="col-md-6">
          <select className="form-select" {...register("sub_cat_id")}>
            <option value="-1">Select Sub Category</option>
            {currentSubcatList.map((subcat) => (
              <option value={subcat.id} key={subcat.id}>
                {subcat.sub_category_name}
              </option>
            ))}
          </select>
          {errors.sub_cat_id && (
            <small className="text-danger w-100">
              {errors.sub_cat_id.message}
            </small>
          )}
        </div>
      </div>

      <div className="custom_Question_form">
        <div className="form-group add_question mb-3">
          <label htmlFor="textInput">Enter your question below:</label>
          <input
            type="text"
            className="form-control question_text"
            id="textInput"
            name="textInput"
            placeholder="Enter question"
            {...register("question")}
          />
          {errors.question && (
            <small className="text-danger w-100">
              {errors.question.message}
            </small>
          )}
        </div>

        <div className="form-group form-check answer_option">
          <div className="option_block_holder">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              value="a"
              {...register("q_right_opt")}
            />
            <input
              type="text"
              placeholder="Answer your question"
              {...register("q_opt.a")}
            />
          </div>
          {errors.q_opt?.a && (
            <small className="text-danger w-100">
              {errors.q_opt?.a.message}
            </small>
          )}
        </div>

        <div className="form-group form-check answer_option">
          <div className="option_block_holder">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              value="b"
              {...register("q_right_opt")}
            />
            <input
              type="text"
              placeholder="Answer your question"
              {...register("q_opt.b")}
            />
          </div>
          {errors.q_opt?.b && (
            <small className="text-danger w-100">
              {errors.q_opt?.b.message}
            </small>
          )}
        </div>

        <div className="form-group form-check answer_option">
          <div className="option_block_holder">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              value="c"
              {...register("q_right_opt")}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Answer your question"
              {...register("q_opt.c")}
            />
          </div>
          {errors.q_opt?.c && (
            <small className="text-danger w-100">
              {errors.q_opt?.c.message}
            </small>
          )}
        </div>

        <div className="form-group form-check answer_option">
          <div className="option_block_holder">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              value="d"
              {...register("q_right_opt")}
            />
            <input
              type="text"
              placeholder="Answer your question"
              {...register("q_opt.d")}
            />
          </div>

          {errors.q_opt?.d && (
            <small className="text-danger w-100">
              {errors.q_opt?.d.message}
            </small>
          )}
        </div>
        {errors.q_opt && (
          <small className="text-danger w-100">{errors.q_opt.message}</small>
        )}
        {errors.q_right_opt && (
          <small className="text-danger w-100">
            {errors.q_right_opt.message}
          </small>
        )}
        <div className="form-group add_question mb-3">
          <label htmlFor="textInput">Select Complexity</label>
          <select className="form-select" {...register("complexity")}>
            <option value="-1">Select Difficulty Level</option>
            {ComplexityData.map((complexity) => (
              <option value={complexity.id} key={complexity.id}>
                {complexity.name}
              </option>
            ))}
          </select>
          {errors.complexity && (
            <small className="text-danger w-100">
              {errors.complexity.message}
            </small>
          )}
        </div>
      </div>
      {editMode && (
        // <div className="log-inner form-group" style={{ margin: "10px" }}>

        <div className="form-group">
          <label>Status</label>
          <select {...register("active")} className="form-select">
            {statusData.map((status) => {
              return (
                <option value={status.id} key={status.id}>
                  {status.name}
                </option>
              );
            })}
          </select>
          {(errors as FieldErrors<EditFormData>).active && (
            <small className="text-danger w-100">
              {(errors as FieldErrors<EditFormData>).active?.message}
            </small>
          )}
        </div>
      )}
      <button
        className="btn btn-lg custom-btn rounded-pill custom-btn-new"
        disabled={loadingQuestion || loadingEditQuestion}
      >
        {loadingQuestion || loadingEditQuestion ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

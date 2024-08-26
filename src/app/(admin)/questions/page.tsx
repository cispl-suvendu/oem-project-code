"use client";
import React, { useReducer } from "react";
import HdModel from "../../components/HdModel/HdModel";
import HeaderMenu from "../../components/Headermenu/headermenu";
import QuestionForm from "../../components/Questions/QuestionForm";
import QuestionsCard from "../../components/Questions/QuestionsCard";
import LoadingQuestions from "../../components/Skeleton/LoadingQuestions";
import { IQuestions } from "../../interfaces/Question";
import AlertStatus from "../../components/Alert/AlertStatus";
import { modalReducer, initialState } from "../../services/modelReducer";
import useFetchData from "../../hooks/useFetch";
import categoryService from "../../services/categoryService";
import questionService from "../../services/questionService";
import { useFilterContext } from "../../context/filterContext";
import Pagination from "../../components/Pagination/Pagination";

export default function QuestionnairesPage() {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { searchText, limit, page } = useFilterContext();

  const {
    data: allQuestions,
    loading: loadingQuestion,
    refetch: fetchQuestions,
  } = useFetchData(
    questionService.fetchQuestion,
    { searchText, active: 1, limit, page },
    (result) => result
  );

  const { data: categories } = useFetchData(
    categoryService.fetchCategories,
    { active: 1 },
    (result) => result
  );

  const { data: subCategories } = useFetchData(
    categoryService.fetchAllSubCategories,
    { active: 1 },
    (result) => result
  );

  const { data: questionCount, refetch: fetchQuestionCount } = useFetchData(
    questionService.fetchQuestionCount,
    { searchText, active: 1, limit, page },
    (result) => result
  );

  const handleAdd = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "add", title: "Add Question" },
    });
  };

  const handleEdit = (item: IQuestions) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "edit", title: "Edit Question", data: item },
    });
  };

  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <HeaderMenu
        type="Questions"
        handleOpen={handleAdd}
        addButton="Questions"
        filter={fetchQuestions}
        fetchCount={fetchQuestionCount}
      />
      <div className="question_added_row row">
        {loadingQuestion ? (
          <LoadingQuestions />
        ) : allQuestions.length > 0 ? (
          allQuestions.map((question) => {
            return (
              <QuestionsCard
                key={question.id}
                item={question}
                handleEditOpen={handleEdit}
                handleRefetch={fetchQuestions}
                fetchCount={fetchQuestionCount}
              />
            );
          })
        ) : (
          <AlertStatus status="error" message="No Question found!" />
        )}
      </div>
      <Pagination countData={questionCount} handleRefetch={fetchQuestions} />
      <HdModel
        handleModelOpen={state.isModalOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <QuestionForm
          allCategories={categories}
          allSubCategories={subCategories}
          isAddOpen={state.isAddOpen}
          isEditOpen={state.isEditOpen}
          questionInfo={state.data}
          handleModalClose={handleModalClose}
          handleRefetch={fetchQuestions}
          fetchCount={fetchQuestionCount}
        />
      </HdModel>
    </>
  );
}

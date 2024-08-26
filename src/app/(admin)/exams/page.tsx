"use client";
import React, { useReducer } from "react";
import HeaderMenu from "../../components/Headermenu/headermenu";
import HdModel from "../../components/HdModel/HdModel";
import ExamComponent from "../../components/exams/examsComponents";
import ExamForm from "../../components/exams/examModel";
import categoryService from "../../services/categoryService";
import { modalReducer, initialState } from "../../services/modelReducer";
import useFetchData from "../../hooks/useFetch";
import ExamService from "../../services/examsServices";
import { fetchExamInterface } from "../../interfaces/Exam";
import UserService from "../../services/userService";
import { useFilterContext } from "../../context/filterContext";
import Pagination from "../../components/Pagination/Pagination";

export default function Exams() {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const examsServices = new ExamService();
  const userServices = new UserService();
  const { searchText, limit, page } = useFilterContext();

  const {
    data: exams,
    loading: loadingExam,
    refetch: fetchExams,
  } = useFetchData(
    examsServices.fetchAllExams,
    { searchText, active: 1, limit, page },
    (result) => result
  );

  const { data: examCount, refetch: fetchAllExamsCount } = useFetchData(
    examsServices.fetchAllExamsCount,
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

  const { data: allUsers } = useFetchData(
    userServices.fetchAllUsers,
    { active: 1, role: [0] },
    (result) => result
  );

  const handleAdd = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "add", title: "Add Exam" },
    });
  };

  const handleEdit = (item: fetchExamInterface) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { mode: "edit", title: "Edit Exam", data: item },
    });
  };

  const handleModalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <HeaderMenu
        type="Exams"
        handleOpen={handleAdd}
        addButton="Exam"
        filter={fetchExams}
        fetchCount={fetchAllExamsCount}
      />

      <HdModel
        handleModelOpen={state.isModalOpen}
        handleModelClose={handleModalClose}
        HdTitle={state.titleText}
      >
        <ExamForm
          currentExam={state.data}
          categories={categories}
          subCategories={subCategories}
          isAddOpen={state.isAddOpen}
          isEditOpen={state.isEditOpen}
          handleModalClose={handleModalClose}
          handleRefetch={fetchExams}
          fetchCount={fetchAllExamsCount}
        />
      </HdModel>

      <ExamComponent
        isLoading={loadingExam}
        handleEdit={handleEdit}
        handleRefetch={fetchExams}
        allExams={exams}
        allUsers={allUsers}
        fetchCount={fetchAllExamsCount}
      />
      <Pagination countData={examCount} handleRefetch={fetchExams} />
    </>
  );
}

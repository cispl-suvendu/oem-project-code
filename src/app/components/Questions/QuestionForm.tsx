"use client";
import React, { useEffect, useState } from "react";
import { ISubCategory } from "../../interfaces/Category";
import CustomQuestionFormm from "./form/CustomQuestionForm";
import CSVQuestionForm from "./form/CSVQuestionForm";

export default function QuestionForm({
  allCategories,
  allSubCategories,
  isAddOpen,
  isEditOpen,
  handleModalClose,
  questionInfo,
  handleRefetch,
  fetchCount
}) {
  const [currentSubcatList, setCurrentSubCatList] =
    useState<ISubCategory[]>(allSubCategories);
  const [currentCat, setCurrentCat] = useState<number>(questionInfo?.cat_id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<boolean>(false);
  const [csvMode, setCSVMode] = useState<boolean>(false);
  const [customMode, setCustomMode] = useState<boolean>(false);
  useEffect(() => {
    setEditMode(isEditOpen);
    setAddMode(isAddOpen);
    setCustomMode(isEditOpen);
  }, []);

  const handleCSVMode = () => {
    setCSVMode(true);
    setCustomMode(false);
  };

  const handleCustomMode = () => {
    setCSVMode(false);
    setCustomMode(true);
  };

  return (
    <>
      {addMode && !csvMode && !customMode ? (
        <div className="question_add_type">
          <div className="option-csv">
            <div className="text-center">Click here to bulk Upload (csv)</div>
            <button
              type="button"
              onClick={() => handleCSVMode()}
              className="btn btn-lg custom-btn rounded-pill custom-btn-new"
            >
              Add CSV (Bulk Add)
            </button>
          </div>
          <div className="text-center or_text">
            <span>OR</span>
          </div>
          <div className="option-manual">
            <div className="text-center">click here to add Manually</div>
            <button
              type="button"
              onClick={() => handleCustomMode()}
              className="btn btn-lg custom-btn rounded-pill custom-btn-new"
            >
              Add Manually (One to One Add)
            </button>
          </div>
        </div>
      ) : null}
      {customMode ? (
        <CustomQuestionFormm
          {...{
            allCategories,
            questionInfo,
            allSubCategories,
            currentSubcatList,
            setCurrentSubCatList,
            currentCat,
            setCurrentCat,
            editMode,
            handleModalClose,
            isEditOpen,
            handleRefetch,
            fetchCount
          }}
        />
      ) : null}
      {csvMode ? (
        <CSVQuestionForm
          {...{
            allCategories,
            allSubCategories,
            currentSubcatList,
            setCurrentSubCatList,
            handleModalClose,
            handleRefetch,
            fetchCount
          }}
        />
      ) : null}
    </>
  );
}

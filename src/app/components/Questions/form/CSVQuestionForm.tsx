import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/app/context/authcontext";
import { ISubCategory, ICategory } from "@/src/app/interfaces/Category";
import { IoIosCloudUpload } from "react-icons/io";
import { FaFileCsv, FaCheck, FaDownload } from "react-icons/fa6";
import { Progress } from "@chakra-ui/react";
import Link from "next/link";
import usePostData from "@/src/app/hooks/usePost";
import questionService from "@/src/app/services/questionService";
import { useFilterContext } from "@/src/app/context/filterContext";

type CustomFile = {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  webkitRelativePath: string;
  content: string | ArrayBuffer;
};

export default function CSVQuestionForm({
  allCategories,
  allSubCategories,
  currentSubcatList,
  setCurrentSubCatList,
  handleModalClose,
  handleRefetch,
  fetchCount,
}) {
  const { updateFilter, searchText, active, limit, page } = useFilterContext();

  const { loading: loadingQuestion, postData: postQuestion } = usePostData(
    questionService.createQuestion,
    (result) => {
      if (result.success) {
        const payload = { searchText, active, limit, page };
        handleRefetch(payload);
        fetchCount(payload);
        updateFilter(payload);
        handleModalClose();
      }
    }
  );
  const { user } = useAuthContext();
  const catRf = useRef(null);
  const subCatRf = useRef(null);
  const [files, setFiles] = useState<CustomFile | null>(null);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [formError, setFormError] = useState({
    catError: "",
    subCatError: "",
    fileError: "",
  });
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (!uploadFile) return;

    const reader = new FileReader();
    reader.onloadstart = () => {
      setProgressValue(0);
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setProgressValue(progress);
      }
    };
    reader.onload = () => {
      const fileContent = reader.result;
      if (fileContent) {
        const customFile: CustomFile = {
          name: uploadFile.name,
          lastModified: uploadFile.lastModified,
          size: uploadFile.size,
          type: uploadFile.type,
          webkitRelativePath: uploadFile.webkitRelativePath,
          content: fileContent,
        };
        setFiles(customFile);
        const uploadTime = 1000;
        const interval = 50;
        const steps = uploadTime / interval;
        let currentStep = 0;
        const updateProgress = () => {
          const progress = (currentStep / steps) * 100;
          setProgressValue(progress);
          currentStep++;

          if (currentStep <= steps) {
            setTimeout(updateProgress, interval);
          } else {
            setProgressValue(100);
          }
        };
        setTimeout(updateProgress, interval);
      }
    };
    reader.readAsArrayBuffer(uploadFile);
  };

  /**  Sub Category list for Add mode **/
  const getSubCategory = (cat_id: string) => {
    const temp = allSubCategories.filter(
      (subcat: ISubCategory) => subcat.catgeory_id === parseInt(cat_id)
    );
    setCurrentSubCatList(temp);
  };

  const { handleSubmit, reset } = useForm();

  const checkError = () => {
    if (catRf.current.value === "-1") {
      setFormError((prevError) => ({
        ...prevError,
        catError: "Category must be selected.",
      }));
      return false;
    } else {
      setFormError((prevError) => ({
        ...prevError,
        catError: "",
      }));
    }
    if (subCatRf.current.value === "-1") {
      setFormError((prevError) => ({
        ...prevError,
        subCatError: "Sub Category must be selected.",
      }));
      return false;
    } else {
      setFormError((prevError) => ({
        ...prevError,
        subCatError: "",
      }));
    }
    if (fileInputRef.current.value === "") {
      setFormError((prevError) => ({
        ...prevError,
        fileError: "Please choose .CSV format files only",
      }));
      return false;
    } else {
      setFormError((prevError) => ({
        ...prevError,
        fileError: "",
      }));
      return true;
    }
  };

  const submitForm = () => {
    checkError();
    const err = checkError();
    if (!files || !err) return;
    const blob = new Blob([files.content], { type: files.type });
    const formData = new FormData();
    formData.append("question", blob, files.name);
    formData.append("cat_id", catRf.current.value);
    formData.append("sub_cat_id", subCatRf.current.value);
    formData.append("user_id", user.id.toString());
    postQuestion(formData);
    reset();
  };
  return (
    <>
      {/* <div className="alert alert-success"> */}

      <div className="download_csv_header">
        <Link href="sample-question.csv" locale={false} target="_blank">
          Download Sample CSV <FaDownload />
        </Link>
      </div>
      <form onSubmit={handleSubmit(submitForm)} className="questionadd">
        <div className="form-row row selectcatregory_dropdown my-4">
          <div className="col-md-6">
            <select
              className="form-select"
              onChange={(e) => {
                getSubCategory(e.target.value), checkError();
              }}
              ref={catRf}
            >
              <option value="-1">Select Category</option>
              {allCategories.map((cat: ICategory) => (
                <option value={cat.id} key={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            {formError.catError !== "" && (
              <small className="text-danger">{formError.catError}</small>
            )}
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              ref={subCatRf}
              onChange={checkError}
            >
              <option value="-1">Select Sub Category</option>
              {currentSubcatList.map((subcat: ISubCategory) => (
                <option value={subcat.id} key={subcat.id}>
                  {subcat.sub_category_name}
                </option>
              ))}
            </select>
            {formError.subCatError !== "" && (
              <small className="text-danger">{formError.subCatError}</small>
            )}
          </div>
        </div>
        <div className="csv_Question_form">
          <input
            type="file"
            accept=".csv"
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              handleUpload(e), checkError();
            }}
          />
          <div
            className="upload_container d-flex flex-column justify-content-center align-items-center p-5 border rounded"
            onClick={() => handleFileInputClick()}
          >
            <IoIosCloudUpload className="h2" />
            <div>Browse CSV file to upload</div>
          </div>
          {formError.fileError !== "" && (
            <small className="text-danger">{formError.fileError}</small>
          )}
        </div>
        <div className="show_uploaded_file mt-4">
          {files?.name && (
            <>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                  <FaFileCsv />
                  <div>{files?.name}</div>
                </div>
                <div style={{ width: "200px" }}>
                  <Progress
                    hasStripe
                    colorScheme="green"
                    size="sm"
                    value={progressValue}
                  />
                </div>
                <div>
                  <FaCheck />
                </div>
              </div>
            </>
          )}
        </div>
        <button
          className="btn btn-lg custom-btn rounded-pill custom-btn-new"
          disabled={loadingQuestion}
        >
          {loadingQuestion ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
}

"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import ExamService from "../services/examsServices";
import handleApiError from "../services/errorHandling";
import {
  fetchExamParmsInterface,
  fetchExamInterface,
  examCreateInterface,
  examEditInterface,
} from "../interfaces/Exam";

const useExamsHooks = () => {
  const examServices = new ExamService();
  const [loadingExam, setLoadingExam] = useState(false);
  const [exams, setExams] = useState<fetchExamInterface[]>([]);

  const [initialPayload, setPayload] = useState<fetchExamParmsInterface>({});
  const fetchExams = async (payload: fetchExamParmsInterface) => {
    setPayload(payload);

    try {
      setLoadingExam(true);
      const response = await examServices.fetchAllExams(payload);
      if (response.success) {
        setExams(response.data);
      } else {
        toast.error("Failed to fetch Questions");
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoadingExam(false);
    }
  };

  const createExam = async (payload: examCreateInterface): Promise<boolean> => {
    try {
      setLoadingExam(true);
      const response = await examServices.createExam(payload);
      if (response.success) {
        toast.success(response.message);
        await fetchExams(initialPayload);

        return response.success;
      } else {
        toast.error("Failed to fetch Questions");
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoadingExam(false);
    }
    return false;
  };

  const updateExam = async (payload: examEditInterface): Promise<boolean> => {
    try {
      setLoadingExam(true);
      const response = await examServices.updateExam(payload);
      if (response.success) {
        toast.success(response.message);
        await fetchExams(initialPayload);

        return response.success;
      } else {
        toast.error("Failed to fetch Questions");
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoadingExam(false);
    }
    return false;
  };

  const deleteExam = async (exam_id) => {
    let payload = [{ exam_id: exam_id }];
    try {
      const response = await examServices.deleteExam(payload);
      if (response.success) {
        setExams((prevExam) =>
          prevExam.filter((exam) => exam.exam_id !== exam_id)
        );
        toast.success(response.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    exams,
    setExams,
    fetchExams,
    createExam,
    updateExam,
    deleteExam,
    setLoadingExam,
    loadingExam,
  };
};

export default useExamsHooks;

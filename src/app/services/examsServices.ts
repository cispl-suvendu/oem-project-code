import { fetchExamParmsInterface } from "../interfaces/Exam";
import requests from "./http";

class ExamService {



  // fetchAllExams(payload) {
  //   let params = new URLSearchParams(payload);

  //   return requests.get(`/exam${params.size > 0 ? "?" + params : ""}`);
  // }

  fetchAllExams(payload: fetchExamParmsInterface) {
    let url = '/exam/?';
    const params: string[] = [];

    if (payload.active !== undefined) {
      params.push(`active=${payload.active}`);
    }
    if (payload.searchText) {
      params.push(`searchText=${payload.searchText}`);
    }
    if (payload.limit !== undefined) {
      params.push(`limit=${payload.limit}`);
    }
    if (payload.page !== undefined) {
      params.push(`page=${payload.page}`);
    }

    url += params.join('&');

    return requests.get(url);
  }

  fetchAllExamsCount(payload: fetchExamParmsInterface) {
    let url = '/exam/?requestType=count&';
    const params: string[] = [];

    if (payload.active !== undefined) {
      params.push(`active=${payload.active}`);
    }
    if (payload.searchText) {
      params.push(`searchText=${payload.searchText}`);
    }
    if (payload.limit !== undefined) {
      params.push(`limit=${payload.limit}`);
    }
    if (payload.page !== undefined) {
      params.push(`page=${payload.page}`);
    }

    url += params.join('&');

    return requests.get(url);
  }

  createExam(payload: object) {
    return requests.post("/exam", payload);
  }

  // fetchCategoryById(cat_id: number) {
  //   const url = `/categories/?cat_id=${cat_id}`;
  //   return requests.get(url);
  // }

  deleteExam(id: number) {
    let payload = [{ exam_id: id }]
    return requests.delete("/exam", payload);
  }

  updateExam(payload: object) {
    return requests.patch("/exam", payload);
  }

  assignExam(payload: object) {
    return requests.post("/exam/assign", payload);
  }
}

export default ExamService;

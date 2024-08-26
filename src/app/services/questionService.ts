import requests from "./http";
import { IQuestionPost, IQuestionEdit, IQuestionDelete, IFilterQuestions, ICSVQuestionPost } from "../interfaces/Question";


class QuestionService {

    createQuestion(paylod: IQuestionPost | FormData) {
        return requests.post("/questions", paylod);
    }

    fetchQuestion(payload: IFilterQuestions) {
        let url = '/questions/?';
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

    fetchQuestionCount(payload) {
        let url = `/questions/?requestType=count&`;
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


    fetchQuestionById(id: number) {
        const url = `/questions/?q_id=${id}`;
        return requests.get(url);
    }

    editQuestion(payload: IQuestionEdit) {
        return requests.patch("/questions", payload);
    }

    removeQuestion(payload: IQuestionDelete) {
        return requests.delete("/questions", payload);
    }


}



// eslint-disable-next-line import/no-anonymous-default-export
export default new QuestionService();
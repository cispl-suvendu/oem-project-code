import requests from "./http";
import { ISubCategoryFetchById, IFilterCategory, IFilterSubCategory } from "../interfaces/Category";


export interface FetchCategoriesParams {
  searchText?: string;
  active?: number;
  limit?: number;
  page?: number;
  cat_id?: number;
}

export interface CategoryResponse {
  data: Category[];
  success: boolean;
}

export interface Category {
  id: number;
  category_name: string;
  cat_slug: string;
}

class CategoryService {

  createCategory(paylod: object) {
    return requests.post("/categories", paylod);
  }


  // fetchCategories() {
  //   return requests.get("/categories");
  // }

  fetchCategories(payload: IFilterCategory) {
    let url = '/categories/?';
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


  fetchCategoryById(cat_id: number) {
    const url = `/categories/?cat_id=${cat_id}`;
    return requests.get(url);
  }

  removeCategories(id: number) {
    const payload = { cat_id: id };
    return requests.delete("/categories", payload);
  }

  editCategory(payload: object) {
    return requests.patch("/categories", payload);
  }

  createSubCategory(paylod: object) {
    return requests.post("/categories/sub", paylod);
  }

  fetchAllSubCategories() {
    return requests.get('/categories/sub/');
  }

  fetchSubCategories(cat_id: number) {
    const url = `/categories/sub/?cat_id=${cat_id}`;
    return requests.get(url);
  }

  fetchSubCategoriesById(payload: ISubCategoryFetchById) {
    const { cat_id, sub_cat_id } = payload
    const url = `/categories/sub/?cat_id=${cat_id}&sub_cat_id=${sub_cat_id}`;
    return requests.get(url);
  }

  removeSubCategories(id: number) {
    const payload = { sub_cat_id: id };
    return requests.delete("/categories/sub", payload);
  }

  editSubCategory(payload: object) {
    return requests.patch("/categories/sub", payload);
  }

  filterSubCategory(payload: IFilterSubCategory) {
    let url = '/categories/sub/?';
    const params: string[] = [];

    if (payload.cat_id !== undefined) {
      params.push(`cat_id=${payload.cat_id}`);
    }

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

  fetchCategoriesCount(payload) {
    let url = `/categories/?requestType=count&`;
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

  fetchSubCategoryCount(payload: IFilterSubCategory) {
    let url = '/categories/sub/?requestType=count&';
    const params: string[] = [];

    if (payload.cat_id !== undefined) {
      params.push(`cat_id=${payload.cat_id}`);
    }

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


}



// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
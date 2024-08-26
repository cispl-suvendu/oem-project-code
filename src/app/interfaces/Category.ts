export interface ICategory {
    id: number;
    category_name: string;
    cat_slug: string;
    cat_description: string;
    active: number;
  }
  
  export interface ICategoryPost {
    cat_name: string;
    cat_description: string;
    user_id: number;
    active?: number;
  }
  
  export interface ICategoryUpdate {
    cat_name: string;
    cat_description: string;
    user_id: number;
    active: number;
    cat_id: number;
  }
  
  export interface ISubCategoryPost {
    sub_cat_name: string;
    sub_cat_slug: string;
    user_id: number;
    cat_id: number;
  }
  
  export interface ISubCategory {
    id: number;
    catgeory_id: number;
    sub_category_name: string;
    sub_cat_slug: string;
    created_by: number;
    created_at: string;
    updated_at: null;
    active: number;
  }
  
  export interface ISubCategoryUpdate {
    sub_cat_name: string;
    sub_cat_id: number;
    user_id: number;
    cat_id: number;
    sub_cat_slug: string;
  }
  
  export interface ISubCategoryFetchById {
    sub_cat_id: number;
    cat_id: number;
  }
  
  export interface IFilterCategory {
    active?: number;
    limit?: number;
    page?: number;
    searchText?: string;
  }
  
  export interface IFilterSubCategory {
    active?: number;
    limit?: number;
    page?: number;
    searchText?: string;
    cat_id?: number;
    [key: string]: any; // Allow additional properties
  }
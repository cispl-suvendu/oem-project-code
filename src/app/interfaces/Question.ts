export interface IQuestions {
    id: number;
    question: string;
    options: string;
    right_option: string;
    complexity: number;
    active: number;
    cat_id: number;
    category_name: string;
    sub_cat_id: number;
    sub_category_name: string;
    user_id: number;
    full_name: string;
    created_at: string;
    updated_at: string | null;
  }
  
  export interface IQuestionPost {
    question: string;
    q_right_opt: string;
    q_opt: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    cat_id: number;
    sub_cat_id: number;
    user_id: number;
    complexity: number;
  }
  
  export interface ICSVQuestionPost {
    formData: FormData;
    active?: number;
    limit?: number;
    page?: number;
    searchText?: string;
    [key: string]: any;
  }
  
  export interface IQuestionEdit {
    question: string;
    q_right_opt: string;
    q_opt: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    cat_id: number;
    sub_cat_id: number;
    complexity: number;
    user_id: number;
    q_id: number;
    active: number;
    limmit?: number;
  }
  
  export interface IQuestionDelete {
    q_id: number;
    active: number;
    limit?: number;
    page?: number;
    searchText?: string;
    [key: string]: any;
  }
  
  export interface IFilterQuestions {
    active?: number;
    limit?: number;
    page?: number;
    searchText?: string;
    [key: string]: any; // Allow additional properties
  }
// export interface AddFormData {
//   full_name: string;
//   email: string;
//   phone_number: string;
//   password?: string;
//   role: number;
//   type: number;
//   active: number;
//   confirmPassword?: string;
// }

export interface EditFormData {
  full_name?: string;
  email?: string;
  phone_number?: string;
  role?: string | number;
  type?: string | number ;
  active?: string | number ;
  user_id?:string | number;
  id?:string | number;
  password?: string;
  confirmPassword?: string;
}

export interface AddFormData extends EditFormData{
  
}

export interface Props {
  isEditOpen: boolean;
  isAddOpen: boolean;
  currentUser: EditFormData;
  setAllUsers: React.Dispatch<React.SetStateAction<FetchUserInter[]>>
}

export interface FetchUserInter {
  id: number;
  full_name: string;
  phone_number: string;
  role: number;
  active: number;
  type: number;
}

export interface CreateUserInter extends AddFormData{
  
}

export interface EditUserInter extends EditFormData{

}


export interface DeleteUserInterface {
  user_id: number;
}

export interface FetchUserParams {
  searchText?: string;
  active?: number[] | number;
  role?:number[];
  type? :number[];
  limit?: number;
  page?: number;
  user_id?: number;
}

export interface UserResponse {
  data: User[];
  success: boolean;
}

export interface User {
  id: number;
  category_name: string;
  cat_slug: string;
}

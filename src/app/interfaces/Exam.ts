export interface examCreateInterface {
  sub_cat_id: number | string;
  complexity: number | string;
  title: string;
  creator_id?: number | string;
  exam_duration: number | string;
  questions_count: number | string;
  cat_id: number | string;
  active?: number | string;
}

export interface examEditInterface extends examCreateInterface {
  exam_id?: number | string;
}

export interface examDeleteInterface {
  exam_id: number[];
}

export interface fetchExamInterface {
  exam_id: number;
  title: string;
  user_id: number;
  question_ids: string;
  status: number;
  exam_creation_date: string;
  exam_given_date: string;
  active: number;
  exam_link: string;
  questions_count: number;
  exam_duration: number;
}

export interface fetchExamParmsInterface {
  page?: number;
  limit?: number;
  searchText?: string;
  user_id?: number;
  active?: number;
  pending?: number;
}

export interface examProps {
  isEditOpen: boolean;
  isAddOpen: boolean;
  currentExam: examEditInterface;
  setExams: React.Dispatch<React.SetStateAction<fetchExamInterface[]>>;
  categories: any;
  subCategories: any;
  handleAction: ( exams?: {}, flag?: string,) => void;
}

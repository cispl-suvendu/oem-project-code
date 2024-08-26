import { z } from "zod";

export const examSchema = z.object({
  id: z.number().optional(),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(5),
  complexity: z
    .preprocess((val:string) => parseInt(val), z.number(), {
        required_error: "Complexity is required",
        invalid_type_error: "Complexity must be number",
      }),
  exam_duration: z
    .preprocess((val:string) => parseInt(val), z.number(), {
        required_error: "Exam duration is required",
        invalid_type_error: "Exam duration must be number",
      }),
  questions_count: z
    .preprocess((val:string) => parseInt(val), z.number(), {
        required_error: "Questions count is required",
        invalid_type_error: "Questions count must be number",
      }),
  creator_id: z.preprocess((val:string) => parseInt(val), z.number(), {
    required_error: "Creator id is required",
    invalid_type_error: "Creator id must be number",
  }),
  cat_id:z.preprocess((val:string) => parseInt(val), z.number(), {
    required_error: "Category id is required",
    invalid_type_error: "Category id must be number",
  }),
  sub_cat_id: z.preprocess((val:string) => parseInt(val), z.number(), {
    required_error: "Sub Category id is required",
    invalid_type_error: "Sub Category id must be number",
  }),
  exam_id: z
    .number({
      required_error: "Exam id is required",
    })
    .optional(),
  active: z.preprocess((val:string) => parseInt(val), z.number(), {
    required_error: "Active  is required",
    invalid_type_error: "Active id must be number",
  })
    .optional(),
});

import { z } from 'zod';

const ACCEPTED_FILE_TYPES = ['text/csv'];
const MAX_UPLOAD_SIZE = 6 * 1024 * 1024; // 6MB

export const AddQuestionFormSchema = z.object({
    question: z.string().nonempty({ message: "Question is required." }),
    q_right_opt: z.string().nonempty({ message: "Right option is required." }),
    q_opt: z.object({
        a: z.string().nonempty({ message: "Option A is required." }),
        b: z.string().nonempty({ message: "Option B is required." }),
        c: z.string().nonempty({ message: "Option C is required." }),
        d: z.string().nonempty({ message: "Option D is required." }),
    }),
    cat_id: z.string().refine(val => val !== "-1", { message: "Category must be selected." }),
    sub_cat_id: z.string().refine(val => val !== "-1", { message: "Sub-category must be selected." }),
    //user_id: z.number().nonnegative({ message: "User ID is required and must be a non-negative number." }),
    complexity: z.string().refine(val => val !== "-1", { message: "Complexity must be selected." }),
});

export const AddCSVQuestionFormSchema = z.object({
    cat_id: z.string().refine(val => val !== "-1", { message: "Category must be selected." }),
    sub_cat_id: z.string().refine(val => val !== "-1", { message: "Sub-category must be selected." }),
    question: z.custom<File>(val => val instanceof File, 'Please upload a file')
        .refine(
            file => ACCEPTED_FILE_TYPES.includes(file.type),
            { message: 'Please choose .CSV format files only' }
        ),
});



export const editQuestionFormSchema = z.object({
    question: z.string().nonempty({ message: "Question is required." }),
    q_right_opt: z.string().nonempty({ message: "Right option is required." }),
    q_opt: z.object({
        a: z.string().nonempty({ message: "Option A is required." }),
        b: z.string().nonempty({ message: "Option B is required." }),
        c: z.string().nonempty({ message: "Option C is required." }),
        d: z.string().nonempty({ message: "Option D is required." }),
    }),
    cat_id: z.string().refine(val => val !== "-1", { message: "Category must be selected." }),
    sub_cat_id: z.string().refine(val => val !== "-1", { message: "Sub-category must be selected." }),
    //user_id: z.number().nonnegative({ message: "User ID is required and must be a non-negative number." }),
    complexity: z.string().refine(val => val !== "-1", { message: "Complexity must be selected." }),
    active: z.string().min(0).max(2).optional(),
});
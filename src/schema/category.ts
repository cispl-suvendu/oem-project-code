import { z } from "zod";

export const categoryFormSchema = z.object({
  cat_name: z
    .string()
    .nonempty({ message: "Category is required" }),

  cat_description: z
    .string()
    .nonempty({ message: "Please add category description" }),
  active: z.number().min(0).max(2).optional(),
  catId: z.number().optional(),
});


export const editCategoryFormSchema = z.object({
  cat_name: z
    .string()
    .nonempty({ message: "Category is required" }),

  cat_description: z
    .string()
    .nonempty({ message: "Please add category description" }),
  active: z.string().min(0).max(2).optional(),
  catId: z.number().optional(),
});


export const subCategoryFormSchema = z.object({
  sub_cat_name: z
    .string()
    .nonempty({ message: "Category is required" }),

  sub_cat_slug: z
    .string()
    .nonempty({ message: "Please add a slug" }),
});

export const editSubCategoryFormSchema = z.object({
  sub_cat_name: z
    .string()
    .nonempty({ message: "Category is required" }),

  sub_cat_slug: z
    .string()
    .nonempty({ message: "Please add a slug" }),
  active: z.string().min(0).max(2).optional(),
});
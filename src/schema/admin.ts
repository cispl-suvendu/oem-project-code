import { z } from "zod";


export const testformSchema = z.object({
    test: z.string().nonempty({ message: "Test is required" }),
  });
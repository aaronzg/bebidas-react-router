import { z } from "zod";
import { CategorySchema, DrinkSchema, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipes-schema";

export type Category = z.infer<typeof CategorySchema> 

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type Drink = z.infer<typeof DrinkSchema>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
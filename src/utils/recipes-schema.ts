import { z } from 'zod'

const {object, string, array} = z

export const CategorySchema = object({
    strCategory: string()
})

export const CategoriesAPIResponseSchema = array(CategorySchema)

export const DrinkSchema = object({
    idDrink: string(),
    strDrink: string(),
    strDrinkThumb: string()
})

export const DrinkAPIResponseSchema = array(DrinkSchema)

export const SearchFilterSchema = object({
    ingredient: string(),
    category: string()
})

export const RecipeAPIResponseSchema = object({
    idDrink: string(),
    strDrink: string(),
    strDrinkThumb: string(),
    strInstructions: string(),
    strIngredient1: string().nullable(),
    strIngredient2: string().nullable(),
    strIngredient3: string().nullable(),
    strIngredient4: string().nullable(),
    strIngredient5: string().nullable(),
    strIngredient6: string().nullable(),
    strMeasure1: string().nullable(),
    strMeasure2: string().nullable(),
    strMeasure3: string().nullable(),
    strMeasure4: string().nullable(),
    strMeasure5: string().nullable(),
    strMeasure6: string().nullable(),
});
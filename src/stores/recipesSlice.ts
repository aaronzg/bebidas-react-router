import { StateCreator } from "zustand";
import {
    getCategories,
    getRecipeById,
    getRecipes,
} from "../services/recipeServices";
import { Category, Drink, Recipe, SearchFilter } from "../types";

export type recipesSliceType = {
    categories: Category[];
    drinks: Drink[];
    modal: boolean;
    selectedRecipe: Recipe;
    fetchCategories: () => Promise<void>;
    searchRecipes: (filters: SearchFilter) => Promise<void>;
    selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
    closeModal: () => void;
};

export const createRecipesSlice: StateCreator<recipesSliceType> = (set, get) => ({
    categories: [],
    drinks: [],
    modal: false,
    selectedRecipe: {} as Recipe,
    fetchCategories: async () => {
        const categories = await getCategories();
        set({ categories });
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters);
        set({ drinks });
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id);
        console.log(selectedRecipe)
        set({ selectedRecipe, modal: true });
    },
    closeModal() {
        set({ modal: false});
        setTimeout(() => {
            if(!get().modal) {
                set({selectedRecipe: {} as Recipe})
            }
        }, 300);
    },
});

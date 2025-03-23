import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipesSlice, recipesSliceType } from "./recipesSlice";
import {
    createNotificationSlide,
    NotificationSlideType,
} from "./notificationSlide";

export type FavoritesSlideType = {
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExists: (id: Recipe["idDrink"]) => boolean;
    loadFromStorage: () => void;
};

export const createFavoritesSlide: StateCreator<
    FavoritesSlideType & recipesSliceType & NotificationSlideType,
    [],
    [],
    FavoritesSlideType
> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite(recipe) {
        const favorites = get().favorites;
        if (get().favoriteExists(recipe.idDrink)) {
            set({
                favorites: favorites.filter(
                    (drink) => drink.idDrink !== recipe.idDrink
                ),
            });
            createNotificationSlide(set, get, api).showNotification({
                text: "Se eliminó de favoritos",
                error: false,
            });
        } else {
            set({ favorites: [...favorites, recipe] });
            createNotificationSlide(set, get, api).showNotification({
                text: "Se agregó de favoritos",
                error: false,
            });
        }
        createRecipesSlice(set, get, api).closeModal();
        localStorage.setItem("favorites", JSON.stringify(get().favorites));
    },
    favoriteExists(id) {
        const favorites = get().favorites;
        return favorites.some((drink) => drink.idDrink === id);
    },
    loadFromStorage() {
        const favorites = JSON.parse(localStorage.getItem("favorites")!);
        if (favorites) {
            set({
                favorites,
            });
        }
    },
});

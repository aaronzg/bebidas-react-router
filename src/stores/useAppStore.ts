import { create } from "zustand";
import { createRecipesSlice, recipesSliceType } from "./recipesSlice";
import { devtools } from "zustand/middleware";
import { createFavoritesSlide, FavoritesSlideType } from "./favoritesSlide";
import {
    createNotificationSlide,
    NotificationSlideType,
} from "./notificationSlide";

export const useAppStore = create<
    recipesSliceType & FavoritesSlideType & NotificationSlideType
>()(
    devtools((...args) => ({
        ...createRecipesSlice(...args),
        ...createFavoritesSlide(...args),
        ...createNotificationSlide(...args),
    }))
);

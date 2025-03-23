import { StateCreator } from "zustand";
import Notification from "../components/Notification";
import { FavoritesSlideType } from "./favoritesSlide";

type Notification = {
    text: string;
    error: boolean;
    show: boolean;
};

export type NotificationSlideType = {
    notification: Notification;
    showNotification: (payload: Pick<Notification, "text" | "error">) => void;
    closeNotification: () => void;
};

const defaultNotification = {
    text: "",
    error: false,
    show: false,
};

export const createNotificationSlide: StateCreator<
    NotificationSlideType & FavoritesSlideType,
    [],
    [],
    NotificationSlideType
> = (set, get) => ({
    notification: defaultNotification,
    showNotification(payload) {
        set({
            notification: { ...payload, show: true },
        });
        setTimeout(() => {
            get().closeNotification();
        }, 5000);
    },
    closeNotification() {
        set((state) => ({
            notification: { ...state.notification, show: false },
        }));

        setTimeout(() => {
            if(!get().notification.show){
                set((state) => ({
                    notification: { ...state.notification, text: "" },
                }));
                return
            }
        }, 400);
    },
});

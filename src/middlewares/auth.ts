import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userApi } from "@/app/services/userApi";

export const listenerMidleware = createListenerMiddleware();

listenerMidleware.startListening({
    matcher: userApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.accessToken) {
            localStorage.setItem("token", action.payload.accessToken);
        }
    },
});
  
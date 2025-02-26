import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import userSliceReducer from "@/app/reducers/userSlice";
import { listenerMidleware } from "@/middlewares/auth";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        userSliceReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware).prepend(listenerMidleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//     ThunkReturnType,
//     RootState,
//     unknown,
//     Action
// >;

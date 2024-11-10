import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import youtubeSearchSlice from "./slices/searchVideosSlice";
import saveTextSlice from "./slices/saveTextSlice";
import saveRequestSlice from "./slices/saveRequestSlice";
import viewCardSlice from "./slices/viewCardSlice ";
import showFormModalSlice from "./slices/showFormModalSlice";
import toggleEditModeSlice from "./slices/toggleEditModeSlice";
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    videos: youtubeSearchSlice,
    saveText: saveTextSlice,
    viewCard: viewCardSlice,
    saveRequest: saveRequestSlice,
    showFormModal: showFormModalSlice,
    editModeForm: toggleEditModeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

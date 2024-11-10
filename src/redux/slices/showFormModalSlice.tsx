import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IInitialState {
    showModal: boolean,
}
const initialState: IInitialState = {
    showModal: false
}

const showFormModalSlice = createSlice({
    name: "showFormModal",
    initialState,
    reducers: {
        setShowFormModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        },
    },
});

export default showFormModalSlice.reducer;

export const { setShowFormModal } = showFormModalSlice.actions;
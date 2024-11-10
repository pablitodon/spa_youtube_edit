import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IInitialState {
    editMode: boolean,
}
const initialState: IInitialState = {
    editMode: false
}

const toggleEditModeSlice = createSlice({
    name: "setEditMode",
    initialState,
    reducers: {
        setEditModeForm(state, action: PayloadAction<boolean>) {
            state.editMode = action.payload;
        },
    },
});

export default toggleEditModeSlice.reducer;

export const { setEditModeForm } = toggleEditModeSlice.actions;
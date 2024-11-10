import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataForm } from "../../interfaces";



interface IInitialState {
    saveRequest: DataForm[],
}
const initialState: IInitialState = {
    saveRequest: [],
}

const saveRequestSlice = createSlice({
    name: "saveRequest",
    initialState,
    reducers: {
        setSaveRequst(state, action: PayloadAction<DataForm>) {
            const id = Math.floor(Math.random() * 1000000);
            state.saveRequest.push({ ...action.payload, id })
        },
        setEditRequest(state, action: PayloadAction<DataForm>) {
            const { id } = action.payload;
            const index = state.saveRequest.findIndex(item => item.id === id);
            if (index !== -1) {
                state.saveRequest[index] = { ...state.saveRequest[index], ...action.payload }
            }

        }
    },
});

export default saveRequestSlice.reducer;

export const { setSaveRequst, setEditRequest } = saveRequestSlice.actions;
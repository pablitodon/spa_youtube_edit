import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IInitialState {
    saveText: string,
}
const initialState: IInitialState = {
    saveText: ''
}

const saveTextSlice = createSlice({
    name: "saveText",
    initialState,
    reducers: {
        setSaveText(state, action: PayloadAction<string>) {
            state.saveText = action.payload;
        },
    },
});

// Экспорт редюсера
export default saveTextSlice.reducer;

// Экспорт действия для использования в компонентах
export const { setSaveText } = saveTextSlice.actions;
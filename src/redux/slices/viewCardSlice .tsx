import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IInitialState {
    viewCard: string,
}
const initialState: IInitialState = {
    viewCard: 'list'
}

const viewCardSlice = createSlice({
    name: "viewCard",
    initialState,
    reducers: {
        setActiveView(state, action: PayloadAction<string>) {
            state.viewCard = action.payload;
        },
    },
});

// Экспорт редюсера
export default viewCardSlice.reducer;

// Экспорт действия для использования в компонентах
export const { setActiveView } = viewCardSlice.actions;
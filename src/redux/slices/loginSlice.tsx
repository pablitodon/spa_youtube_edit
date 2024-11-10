import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Ilogin, ILoginResponse } from "../../interfaces";



interface ILoginState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    token?: string;
    error?: string;
}


const BASE_URL = import.meta.env.VITE_SOME_URL_REGISTER_URL;
const params = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};

const postRespLogin = async (formData: Ilogin) => {
    const response = await axios.post<ILoginResponse>(BASE_URL, formData, params);
    return response.data;
};

const fetchUserLoginPost = createAsyncThunk<ILoginResponse, Ilogin>(
    'youtube/login',
    async (formData) => {
        const data = await postRespLogin(formData);
        return data;
    }
);

const initialState: ILoginState = {
    status: 'idle',
    token: undefined,
    error: undefined,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLoginPost.pending, (state) => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(fetchUserLoginPost.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
                state.status = 'succeeded';
                localStorage.setItem('myToken', action.payload.token);
                state.token = action.payload.token;
            })
            .addCase(fetchUserLoginPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default loginSlice.reducer;
export { fetchUserLoginPost };

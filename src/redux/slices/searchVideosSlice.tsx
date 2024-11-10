import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IRespSearch, IStatisticsResponse, IYouTubeSearchResult } from "../../interfaces";






const YOUTUBE_URL = import.meta.env.VITE_SOME_URL_REACT_APP_YOUTUBE_API_URL;
const YOUTUBE_URL_STAT = import.meta.env.VITE_SOME_URL_REACT_APP_YOUTUBE_API_URL_STATISTICS;
const YOUTUBE_KEY = import.meta.env.VITE_SOME_YOUTUBE_API_KEY;

interface IInitialState {
    items: IYouTubeSearchResult[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const getSearch = async ({ order, maxResults = 4, query }: IRespSearch) => {
    try {
        const response = await axios.get(YOUTUBE_URL, {
            params: {
                part: "snippet",
                order,
                maxResults,
                q: `${query}`,
                key: YOUTUBE_KEY,
            }

        })
        console.log(response.data);
        return response.data.items;
    } catch (error) {
        throw `Error fetching data: ${error}`;
    }
};
const getStatisticsVideo = async (ids: string[]) => {
    try {
        const response = await axios.get(YOUTUBE_URL_STAT, {
            params: {
                part: "statistics",
                key: YOUTUBE_KEY,
                id: ids.join(','),
            }
        });
        return response.data.items
    } catch (error) {
        console.log(error);

    }
};


const fetchGetSearch = createAsyncThunk<IYouTubeSearchResult[], IRespSearch>(
    'youtube/searchVideo',
    async (searchParams) => {
        const responseVideos = await getSearch(searchParams);
        const videoIds = responseVideos.map((video: IYouTubeSearchResult) => video.id.videoId);
        const statistics = await getStatisticsVideo(videoIds);
        return responseVideos.map((video: IYouTubeSearchResult) => ({
            ...video, statistics: statistics.find((stat: IStatisticsResponse) => stat.id === video.id.videoId)
        }));
    }
);

const initialState: IInitialState = {
    items: [],
    status: 'idle',
    error: null,
};



const youtubeSearchSlice = createSlice({
    name: "youtubeSearch",
    initialState,
    reducers: {
        clearSearchResults(state) {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetSearch.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetSearch.fulfilled, (state, action: PayloadAction<IYouTubeSearchResult[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchGetSearch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
    },
});


export const { clearSearchResults } = youtubeSearchSlice.actions;
export { fetchGetSearch, }
export default youtubeSearchSlice.reducer;


// Селектор для получения всех видео
// const selectAllVideos = (state: { videos: IInitialState }) => state.videos.items;
// // Селектор для фильтрации видео по заголовку
// export const selectVideosByTitleKeyword = createSelector(
//     [selectAllVideos, (_: { videos: IInitialState }, keyword: string) => keyword],
//     (videos, keyword) => videos.filter((video: { snippet: { title: string } }) => video.snippet.title.toLowerCase().includes(keyword.toLowerCase()))
// );



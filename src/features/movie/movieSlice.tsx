import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { delay } from "@/utils/delay";

type Movie = {
    userId: string;
    id: string;
    title: string;
    body: string;
};

interface MovieProp {
    movies: Movie[];
    status: string;
};

const initialState: MovieProp = {
    movies: [],
    status: ''
};

export const fetchMovie = createAsyncThunk(
    'movie/fetchMovie',
    async (config) => {
        const url = `https://jsonplaceholder.typicode.com/posts`;
        const data = await fetch(url);
        const res = await data.json();
        await delay(1000);
        return res;
    }
);

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovie.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchMovie.fulfilled, (state:any, action) => {
            state.status = 'succeeded';
            state.movies = action.payload;
        })
        builder.addCase(fetchMovie.rejected, (state:any, action) => {
            state.status = 'failed';
        })
    }
});

export const { } = movieSlice.actions;
export default movieSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

const apiKey = 'YOUR_API_KEY';

interface WeatherState {
    data: any;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: WeatherState = {
    data: null,
    status: 'idle',
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (location: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );
        return response.data;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const selectWeather = (state: RootState) => state.weather.data;
export default weatherSlice.reducer;

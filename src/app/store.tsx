import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/features/movie/movieSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        movies: movieReducer
    }
});

// กำหนดชนิดของ RootState เป็น ReturnType ของ getState() ของ store
export type RootState = ReturnType<typeof store.getState>

// กำหนดชนิดของ AppDispatch เป็น typeof dispatch ของ store
export type AppDispatch = typeof store.dispatch

// สร้าง hook สำหรับใช้งาน dispatch และ selector ในแอปพลิเคชัน
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  
export default store;
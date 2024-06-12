'use client'

import React from 'react';
import { useTypedSelector, useAppDispatch } from '@/app/store';
import { fetchMovie } from '@/features/movie/movieSlice';
    
function MovieComponent() {
    const dispatch = useAppDispatch(); // เรียกใช้ hook เพื่อ dispatch actions
    const { movies, status } = useTypedSelector((state) => state.movies); // เรียกใช้ hook เพื่อเข้าถึง state จาก store

    return (
    <div>
        {status === 'succeeded' && movies ? 
            movies?.map((movie) => (
                <ul key={movie.id}>
                    <li>{movie.title}</li>
                </ul>
            ))
            : <button type='button' onClick={() => dispatch(fetchMovie())}>MOVIES</button>
        }
    </div>
  );
}

export default MovieComponent;

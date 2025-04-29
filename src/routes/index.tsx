import { Routes, Route, Navigate } from "react-router-dom";
import { Home, MovieDetails, Search } from '../pages'

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/movie/:id" element={<MovieDetails/>}/>
            <Route path="/search/:query/:page" element={<Search/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, MovieDetails, Search } from '../pages'

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/movieinfo/home" element={<Home/>}/>
            <Route path="/movieinfo/movie/:id" element={<MovieDetails/>}/>
            <Route path="/movieinfo/search/:query/:page" element={<Search/>}/>
            <Route path="*" element={<Navigate to="/movieinfo/home"/>}/>
        </Routes>
    )
}
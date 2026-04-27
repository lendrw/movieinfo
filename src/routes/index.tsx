import { Routes, Route, Navigate } from "react-router-dom";
import { Home, MovieDetails, Search } from '../pages'
import { AppPaths } from "./paths";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path={AppPaths.home} element={<Home/>}/>
            <Route path={AppPaths.movieDetailsRoute} element={<MovieDetails/>}/>
            <Route path={AppPaths.searchRoute} element={<Search/>}/>
            <Route path="*" element={<Navigate to={AppPaths.home}/>}/>
        </Routes>
    )
}

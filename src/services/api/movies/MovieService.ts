import { Api } from "../axios-config";
import { Environment } from "../../../environment";

export interface IMovieGenres {
    id: number;
    name: string;
}

export interface IMoviesList {
    id: number;
    title: string;
    tagline: string;
    budget: number;
    revenue: number;
    runtime: number;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    release_date: string;
    genres: IMovieGenres[];
    original_title: string;
    original_language: string;
    popularity: number;
}

export type TMovies = {
    page: number;
    results: IMoviesList[];
    total_pages: number;
    total_results: number;
};

// Result type pattern for better error handling
export type Result<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

const API_KEY = `api_key=${Environment.API_KEY}`;
const BASE_URL = `${Environment.API_BASE_URL}/movie`;
const SEARCH_URL = `${Environment.API_BASE_URL}/search/movie`;
const IMAGE_BASE_URL = Environment.IMAGE_BASE_URL;

export const getImageUrl = (path: string | null): string => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}${path}`;
};

const getSearchMovie = async (page = 1, query: string): Promise<Result<TMovies>> => {
    try {
        const res = await Api.get(`${SEARCH_URL}?${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);

        const data = res.data;

        return {
            success: true,
            data: {
                page: data.page,
                results: data.results,
                total_pages: data.total_pages,
                total_results: data.total_results
            }
        };
        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to search movies.';
        console.error(errorMessage);
    
        return {
            success: false,
            error: errorMessage
        };
    }    
}

const getTopRatedMovies = async (page = 1): Promise<Result<TMovies>> => {
    try {
        const res = await Api.get(`${BASE_URL}/top_rated?${API_KEY}&page=${page}`);

        const data = res.data;

        return {
            success: true,
            data: {
                page: data.page,
                results: data.results,
                total_pages: data.total_pages,
                total_results: data.total_results
            }
        };
        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load top rated movies.';
        console.error(errorMessage);
    
        return {
            success: false,
            error: errorMessage
        };
    }    
};

export const getById = async (id: number): Promise<Result<IMoviesList>> => {
    
    try {
        const { data } = await Api.get(`${BASE_URL}/${id}?${API_KEY}`);

        if (data) {
            return {
                success: true,
                data
            };
        }
        
        return {
            success: false,
            error: 'Failed to load the movie.'
        };
        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load the movie.';
        console.error(errorMessage);
    
        return {
            success: false,
            error: errorMessage
        };
    }    
}

export const MovieService = {
    getTopRatedMovies,
    getById,
    getSearchMovie,
};
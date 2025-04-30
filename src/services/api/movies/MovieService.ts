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


const key = Environment.api_key;
const url = Environment.BASE_URL;
const search = Environment.SEARCH;

const getSearchMovie = async (page = 1, query: string): Promise<TMovies | Error> => {
    try {
        const res = await Api.get(`${search}?${key}&query=${query}&page=${page}`);

        const data = res.data;

        return {
            page: data.page,
            results: data.results,
            total_pages: data.total_pages,
            total_results: data.total_results
        };
        
    } catch (error: unknown) {
        console.error(error);
    
        if (error instanceof Error) {
            return new Error(error.message);
        }
    
        return new Error('Failed to load the movies.');
    }    
}


const getTopRatedMovies = async (page = 1): Promise<TMovies | Error> => {
    try {
        const res = await Api.get(`${url}top_rated?${key}&page=${page}`);

        const data = res.data;

        return {
            page: data.page,
            results: data.results,
            total_pages: data.total_pages,
            total_results: data.total_results
        };
        
    } catch (error: unknown) {
        console.error(error);
    
        if (error instanceof Error) {
            return new Error(error.message);
        }
    
        return new Error('Failed to load the movies.');
    }    
};

export const getById = async (id: number): Promise<IMoviesList | Error> => {
    
    try {
        const { data } = await Api.get(`${url}${id}?${key}`);

        if (data) {
            return data;
        }
        
        return new Error('Failed to load the movie.');
        
    } catch (error: unknown) {
        console.error(error);
    
        if (error instanceof Error) {
            return new Error(error.message);
        }
    
        return new Error('Failed to load the movie.');
    }    
}

export const MovieService = {
    getTopRatedMovies,
    getById,
    getSearchMovie,
};
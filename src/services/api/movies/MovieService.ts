import { Api } from "../axios-config";
import { Environment } from "../../../environment";
export interface IMovieGenres {
    id: number;
    name: string;
}
export interface IMovieDetails {
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

export interface IMoviesList {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

type TMovies = {
    data: IMoviesList[];
}

const key = Environment.api_key;
const url = Environment.BASE_URL;


const getTopRatedMovies = async (): Promise<TMovies | Error> => {
    try {
        const res = await Api.get(`${url}top_rated?${key}`);

        const data = res.data;

        return {
            data: data.results as IMoviesList[]
        }
        
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Failed to load the movies.');
    }
};

export const getById = async (id: number): Promise<IMovieDetails | Error> => {
    
    try {
        const { data } = await Api.get(`${url}${id}?${key}`);

        if (data) {
            return data;
        }
        
        return new Error('Failed to load the movie.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Failed to load the movie.');
    }    
}

export const MovieService = {
    getTopRatedMovies,
    getById,
};
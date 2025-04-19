import { Api } from "../axios-config";
import { Environment } from "../../../environment";

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

export const MovieService = {
    getTopRatedMovies,
};
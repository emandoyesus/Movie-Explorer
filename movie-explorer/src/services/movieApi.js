import axios from "axios";

const API_KEY = "ab1bec74546ac894a56499340d6bfc75";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export const getPopularMovies = () => {
    return api.get("/movie/popular", {
        params: { api_key: API_KEY }
    });
};

export const searchMovies = (query) => {
    return api.get("/search/movie", {
        params: {
            api_key: API_KEY,
            query: query
        }
    });
};

export const getMovieDetails = (id) => {
    return api.get(`/movie/${id}`, {
        params: { api_key: API_KEY }
    });
};
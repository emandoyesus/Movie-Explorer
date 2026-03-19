const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

export async function searchMovies(query) {

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await res.json();

  return data.results;
}

export async function getTopRatedMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
}

export async function getUpcomingMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
}
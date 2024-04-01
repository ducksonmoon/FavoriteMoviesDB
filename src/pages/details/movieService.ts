import { apiEndpoints, defaultOptions } from "../../config/api.config";
import { Movietype } from "../../models/movie.types";

export const fetchMovieDetails = async (
  movieId: number
): Promise<Movietype> => {
  const url = apiEndpoints.movieDetails(movieId);

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as Movietype;
    return data;
  } catch (error) {
    console.error("Could not fetch movie details:", error);
    throw error;
  }
};

import { getApiResource } from "../utils";

const API_KEY = (
    import.meta.env.VITE_API_KEY || "").trim();

export const searchFilms = async({ keyword, page = 1 }) => {
    if (!API_KEY) return null;

    const params = new URLSearchParams({
        keyword,
        page: String(page),
    });

    const result = await getApiResource(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?${params.toString()}`, {
            method: "GET",
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );

    if (!result.ok) return null;

    return result.data;
};
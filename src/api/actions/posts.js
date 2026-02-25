import { getApiResource } from "../utils";

export const getPosts = async(limit = 10) => {
    const result = await getApiResource(`/jp/posts?_limit=${limit}`);

    if (!result.ok) {
        return null;
    }

    return result.data;
};
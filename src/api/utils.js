export const getApiResource = async(url, init = {}) => {
    try {
        const response = await fetch(url, init);

        if (!response.ok) {
            return {
                ok: false,
                status: response.status,
                data: null,
                error: `HTTP ${response.status}`,
            };
        }

        const data = await response.json();

        return {
            ok: true,
            status: response.status,
            data,
            error: null,
        };
    } catch (error) {
        return {
            ok: false,
            status: 0,
            data: null,
            error: (error && error.message) || "Network error",
        };
    }
};
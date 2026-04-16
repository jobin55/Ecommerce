const API_URL = "http://backend.ddev.site/api";

export const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
};
const API_URL = "https://backend.ddev.site/api";

// Helper to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper for auth headers
const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Auth API
export const register = async (userData) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
    }
    return data;
};

export const login = async (credentials) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Login failed');
    }
    return data;
};

export const logout = async () => {
    const res = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });
    if (!res.ok) {
        throw new Error('Logout failed');
    }
    return res.json();
};

export const getMe = async () => {
    const res = await fetch(`${API_URL}/me`, {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });
    if (!res.ok) {
        throw new Error('Failed to get user');
    }
    return res.json();
};

// Users API
export const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
};

// Todos API
export const getTodos = async () => {
    const res = await fetch(`${API_URL}/todos`, {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
};

export const createTodo = async (todo) => {
    const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(todo),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to create todo');
    }
    return data;
};

export const updateTodo = async (id, todo) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(todo),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to update todo');
    }
    return data;
};

export const deleteTodo = async (id) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({ message: 'Failed to delete todo' }));
        throw new Error(data.message);
    }
    return res.json();
};

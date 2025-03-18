const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"; // Change this to your backend URL

export const createUser = async (userData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            throw new Error(`Failed to create user: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error creating user:", error);
        return { error: error.message };
    }
};

export const loginUser = async (email, password) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error(`Login failed: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }
};

// Get Current User
export const getCurrentUser = async (token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/me`, {
            method: "GET",
            headers: {
                "Authorization": `${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch user: ${res.statusText}`);
        }

        const userData = await res.json();
        return userData;
    } catch (error) {
        console.error("Fetch user error:", error);
        return { error: error.message };
    }
};
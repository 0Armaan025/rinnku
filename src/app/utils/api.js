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

        console.log("im sending: ", { email, password });

        const res = await fetch(`${API_BASE_URL}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();  // Read error response
            console.error("Login error response:", errorData);
            throw new Error(errorData.error || `Login failed: ${res.statusText}`);
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
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
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

export const updateUser = async (token, userDataNew) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/update`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDataNew),
            // avatar is going to be a link that would be either "", so text is applied as avatar like AR, or it will be a link that will be first stored to cloudinary
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

export const getuserByName = async (name) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/user/${name}`, {
            method: "GET",
            headers: {

                "Content-Type": "application/json",
            },
            // auth is not needed tho here
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

export const createBioLink = async (token, rinnkuUrl) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/bioLinks/create`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ rinnkuUrl }),
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

export const updateBioLink = async (token, rinnkuUrl) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/bioLinks/update`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ rinnkuUrl }),
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

export const deleteBioLink = async (token) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/bioLinks/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
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

export const trackVisit = async (token, rinnkuUrl) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/analytics/track-visit`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ rinnkuUrl }),
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

export const trackClick = async (token, rinnkuUrl, linkId, linkName) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/analytics/track-click`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ rinnkuUrl, linkId, linkName }),
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

export const getStats = async (token, rinnkuUrl) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/analytics/stats/${rinnkuUrl}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },

        });

        if (!res.ok) {
            console.log("no analytics yet");
        }

        const userData = await res.json();
        return userData;
    } catch (error) {
        console.error("Fetch user error:", error);
        return { error: error.message };
    }
};

// PROMO CODE THINGY

export const applyPromoCode = async (token, code) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/promocode/apply/${code}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
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

// FEAT: API.JS is done, now time to integrate it <- hardest
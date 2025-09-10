// Use an environment variable for your API URL
// In your .env file: REACT_APP_API_URL=http://localhost:9090
const API_BASE_URL = process.env.REACT_APP_API_URL;

// A helper function to handle fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        // If the server response is not 2xx, throw an error
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

export const signupUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};
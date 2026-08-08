const API_URL = "http://localhost:5000/api/admin";

export const getAdminStats = async (token) => {

    try {

        const response = await fetch(
            `${API_URL}/stats`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(
            "Admin stats error:",
            error
        );

        return {
            success: false,
            message: "Unable to load admin statistics"
        };

    }
};
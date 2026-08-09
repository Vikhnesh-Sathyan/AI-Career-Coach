const API_URL = "http://localhost:5000/api/admin";

// ==========================================
// GET ADMIN STATS
// ==========================================

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


// ==========================================
// GET ALL ADMIN USERS
// ==========================================

export const getAdminUsers = async (token) => {

    try {

        const response = await fetch(
            `${API_URL}/users`,
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return await response.json();

    } catch (error) {

        console.error(
            "Admin users error:",
            error
        );

        return {
            success: false,
            message: "Unable to load users"
        };
    }
};

// ==========================================
// UPDATE USER STATUS
// ==========================================

export const toggleAdminUserStatus = async (
    token,
    userId
) => {

    try {

        const response = await fetch(
            `${API_URL}/users/${userId}/status`,
            {
                method: "PATCH",

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return await response.json();

    } catch (error) {

        console.error(
            "Toggle user status error:",
            error
        );

        return {
            success: false,
            message: "Unable to update user status"
        };
    }
};


// ==========================================
// DELETE USER
// ==========================================

export const deleteAdminUser = async (
    token,
    userId
) => {

    try {

        const response = await fetch(
            `${API_URL}/users/${userId}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return await response.json();

    } catch (error) {

        console.error(
            "Delete user error:",
            error
        );

        return {
            success: false,
            message: "Unable to delete user"
        };
    }
};
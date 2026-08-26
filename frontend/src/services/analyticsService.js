
import api from "./api";


// ==========================================
// GET ADMIN ANALYTICS
// ==========================================

export const getAdminAnalytics = async () => {

    try {

        const token =
            localStorage.getItem("token");


        const response =
            await api.get(
                "/admin/analytics",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        return response.data;

    }

    catch (error) {

        console.error(
            "Admin analytics error:",
            error
        );


        return {

            success: false,

            message:
                error.response?.data?.message ||
                "Unable to load analytics"

        };

    }

};


import api from "./api";


// =====================================
// GET PREMIUM STATUS
// =====================================

export const getPremiumStatus = async () => {

    try {

        const response =
            await api.get(
                "/premium/status"
            );


        return response.data;

    }

    catch (error) {

        console.error(
            "Get Premium Status Error:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};



// =====================================
// UPGRADE TO PREMIUM
// =====================================

export const upgradeToPremium = async () => {

    try {

        const response =
            await api.put(
                "/premium/upgrade"
            );


        return response.data;

    }

    catch (error) {

        console.error(
            "Upgrade Premium Error:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};



// =====================================
// CANCEL PREMIUM
// =====================================

export const cancelPremium = async () => {

    try {

        const response =
            await api.put(
                "/premium/cancel"
            );


        return response.data;

    }

    catch (error) {

        console.error(
            "Cancel Premium Error:",
            error.response?.data ||
            error.message
        );


        throw error;

    }

};

// ==========================================
// CHECK PREMIUM FEATURE ACCESS
// ==========================================

export const checkPremiumFeature =
    async () => {

        try {

            const response =
                await api.get(
                    "/premium/premium-feature"
                );

            return response.data;

        }

        catch (error) {

            throw error;

        }

    };
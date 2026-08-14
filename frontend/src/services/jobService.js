import api from "./api";

// ==========================================
// AI JOB MATCHER — EXISTING
// ==========================================

export const analyzeJob = async (jobDescription) => {

    const response = await api.post(
        "/job/analyze",
        {
            jobDescription
        }
    );

    return response.data;

};


// ==========================================
// ADMIN — CREATE JOB
// ==========================================

export const createJob = async (data) => {

    const token =
        localStorage.getItem("token");

    const response = await api.post(
        "/jobs",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// ==========================================
// ADMIN — GET ALL JOBS
// ==========================================

export const getJobs = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/jobs",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// ==========================================
// GET SINGLE JOB
// ==========================================

export const getJobById = async (id) => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        `/jobs/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// ==========================================
// ADMIN — UPDATE JOB
// ==========================================

export const updateJob = async (id, data) => {

    const token =
        localStorage.getItem("token");

    const response = await api.put(
        `/jobs/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};


// ==========================================
// ADMIN — DELETE JOB
// ==========================================

export const deleteJob = async (id) => {

    const token =
        localStorage.getItem("token");

    const response = await api.delete(
        `/jobs/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};




// ==========================================
// GET ALL JOBS — ADMIN
// OPEN + CLOSED
// ==========================================

export const getAdminJobs = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/jobs/admin",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

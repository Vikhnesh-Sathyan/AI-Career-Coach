import api from "./api";


// ==========================================
// APPLY FOR JOB
// ==========================================

export const applyForJob = async (jobId) => {

    const response = await api.post(
        "/applications",
        {
            jobId
        }
    );

    return response.data;

};


// ==========================================
// GET MY APPLICATIONS
// ==========================================

export const getMyApplications = async () => {

    const response = await api.get(
        "/applications/my"
    );

    return response.data;

};


// ==========================================
// GET APPLICATIONS FOR A JOB - ADMIN
// ==========================================

export const getJobApplications = async (jobId) => {

    const response = await api.get(
        `/applications/job/${jobId}`
    );

    return response.data;

};


// ==========================================
// UPDATE APPLICATION STATUS - ADMIN
// ==========================================

export const updateApplicationStatus = async (
    applicationId,
    status
) => {

    const response = await api.put(
        `/applications/${applicationId}/status`,
        {
            status
        }
    );

    return response.data;

};

export const getAllApplications = async () => {

    const response =
        await api.get(
            "/applications/admin"
        );

    return response.data;

};




import { useEffect, useState } from "react";

import {
    createJob,
    updateJob
} from "../../services/jobService";


function JobForm({
    job,
    onClose,
    onSuccess
}) {

    const [formData, setFormData] = useState({

        title: "",
        company: "",
        location: "",
        employmentType: "Full-time",
        salary: "",
        experience: "Fresher",
        skills: "",
        applicationDeadline: "",
        description: ""

    });


    const [loading, setLoading] =
        useState(false);


    const isEditMode =
        Boolean(job);


    // ==========================================
    // LOAD JOB DATA FOR EDIT
    // ==========================================

    useEffect(() => {

        if (!job) {

            setFormData({

                title: "",
                company: "",
                location: "",
                employmentType: "Full-time",
                salary: "",
                experience: "Fresher",
                skills: "",
                applicationDeadline: "",
                description: ""

            });

            return;

        }


        setFormData({

            title:
                job.title || "",

            company:
                job.company || "",

            location:
                job.location || "",

            employmentType:
                job.employmentType ||
                "Full-time",

            salary:
                job.salary || "",

            experience:
                job.experience ||
                "Fresher",

            skills:
                Array.isArray(job.skills)
                    ? job.skills.join(", ")
                    : "",

            applicationDeadline:
                job.applicationDeadline
                    ? job.applicationDeadline
                        .split("T")[0]
                    : "",

            description:
                job.description || ""

        });

    }, [job]);


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);


            const payload = {

                ...formData,

                skills:
                    formData.skills
                        .split(",")
                        .map(
                            skill =>
                                skill.trim()
                        )
                        .filter(Boolean)

            };


            let data;


            // ==================================
            // EDIT
            // ==================================

            if (isEditMode) {

                data =
                    await updateJob(
                        job._id,
                        payload
                    );

            }

            // ==================================
            // CREATE
            // ==================================

            else {

                data =
                    await createJob(
                        payload
                    );

            }


            if (data.success) {

                alert(
                    isEditMode
                        ? "Job updated successfully"
                        : "Job posted successfully"
                );


                onSuccess();

                onClose();

            }

            else {

                alert(
                    data.message
                );

            }

        }

        catch (error) {

            console.error(
                "Job form error:",
                error
            );


            alert(

                error.response?.data?.message ||

                (
                    isEditMode
                        ? "Failed to update job"
                        : "Failed to post job"
                )

            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="job-form-overlay">


            <div className="job-form-modal">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="job-form-header">


                    <div>

                        <h2>

                            {
                                isEditMode
                                    ? "Edit Job"
                                    : "Post New Job"
                            }

                        </h2>


                        <p>

                            {
                                isEditMode

                                    ? "Update the job information."

                                    : "Add a new opportunity for users."

                            }

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>


                </div>


                {/* =================================
                    FORM
                ================================= */}

                <form
                    className="job-form"
                    onSubmit={handleSubmit}
                >


                    {/* JOB TITLE + COMPANY */}

                    <div className="form-row">


                        <div className="form-group">

                            <label>
                                Job Title
                            </label>


                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. React Developer"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Company
                            </label>


                            <input
                                type="text"
                                name="company"
                                placeholder="e.g. ABC Technologies"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />

                        </div>


                    </div>


                    {/* LOCATION + EMPLOYMENT */}

                    <div className="form-row">


                        <div className="form-group">

                            <label>
                                Location
                            </label>


                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Kochi / Remote"
                                value={formData.location}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Employment Type
                            </label>


                            <select
                                name="employmentType"
                                value={
                                    formData.employmentType
                                }
                                onChange={handleChange}
                            >

                                <option value="Full-time">
                                    Full-time
                                </option>

                                <option value="Part-time">
                                    Part-time
                                </option>

                                <option value="Internship">
                                    Internship
                                </option>

                                <option value="Contract">
                                    Contract
                                </option>

                            </select>

                        </div>


                    </div>


                    {/* SALARY + EXPERIENCE */}

                    <div className="form-row">


                        <div className="form-group">

                            <label>
                                Salary
                            </label>


                            <input
                                type="text"
                                name="salary"
                                placeholder="e.g. ₹4 - ₹6 LPA"
                                value={formData.salary}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Experience
                            </label>


                            <input
                                type="text"
                                name="experience"
                                placeholder="e.g. Fresher / 1-2 years"
                                value={formData.experience}
                                onChange={handleChange}
                            />

                        </div>


                    </div>


                    {/* SKILLS + DEADLINE */}

                    <div className="form-row">


                        <div className="form-group">

                            <label>
                                Skills
                            </label>


                            <input
                                type="text"
                                name="skills"
                                placeholder="React, Node.js, MongoDB"
                                value={formData.skills}
                                onChange={handleChange}
                            />


                            <small>
                                Separate skills with commas
                            </small>

                        </div>


                        <div className="form-group">

                            <label>
                                Application Deadline
                            </label>


                            <input
                                type="date"
                                name="applicationDeadline"
                                value={
                                    formData.applicationDeadline
                                }
                                onChange={handleChange}
                            />

                        </div>


                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Job Description
                        </label>


                        <textarea
                            name="description"
                            rows="6"
                            placeholder="Describe the role, responsibilities and requirements..."
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                            required
                        />


                    </div>


                    {/* ACTIONS */}

                    <div className="job-form-actions">


                        <button
                            type="button"
                            className="cancel-job-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="submit-job-btn"
                            disabled={loading}
                        >

                            {
                                loading

                                    ? (
                                        isEditMode
                                            ? "Updating..."
                                            : "Posting..."
                                    )

                                    : (
                                        isEditMode
                                            ? "Update Job"
                                            : "Post Job"
                                    )
                            }

                        </button>


                    </div>


                </form>


            </div>

        </div>

    );

}


export default JobForm;

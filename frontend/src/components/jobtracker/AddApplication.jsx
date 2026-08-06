import "../../styles/addapplication.css";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
    FaPlus,
    FaTimes
} from "react-icons/fa";

import {
    addApplication,
    updateApplication
} from "../../services/jobTrackerService";

function AddApplication({

    refresh,
    editData,
    setEditData,
    showToast

}) {

    const emptyForm = {

        company: "",
        role: "",
        location: "",
        jobUrl: "",
        salary: "",
        status: "Applied",
        priority: "Medium",
        appliedDate: "",
        interviewDate: "",
        notes: ""

    };

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState(emptyForm);

    useEffect(() => {

        if (editData) {

            setForm({

                company: editData.company || "",
                role: editData.role || "",
                location: editData.location || "",
                jobUrl: editData.jobUrl || "",
                salary: editData.salary || "",
                status: editData.status || "Applied",
                priority: editData.priority || "Medium",

                appliedDate: editData.appliedDate
                    ? editData.appliedDate.substring(0, 10)
                    : "",

                interviewDate: editData.interviewDate
                    ? editData.interviewDate.substring(0, 10)
                    : "",

                notes: editData.notes || ""

            });

            setOpen(true);

        }

    }, [editData]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const closeModal = () => {

        setOpen(false);

        setEditData(null);

        setForm(emptyForm);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        let data;

        try {

            if (editData) {

                data = await updateApplication(

                    editData._id,

                    form,

                    token

                );

            }

            else {

                data = await addApplication(

                    form,

                    token

                );

            }

            if (data.success) {

                showToast(

    editData

        ? "Application updated successfully"

        : "Application added successfully"

);

refresh();

                closeModal();

            }

            else {

                showToast(

    data.message,

    "error"

);

            }

        }

        catch (error) {

            console.log(error);

            alert("Something went wrong.");

        }

    };

    return (

        <>

            <button

                className="new-job-btn"

                onClick={() => {

                    setEditData(null);

                    setForm(emptyForm);

                    setOpen(true);

                }}

            >

                <FaPlus />

                New Application

            </button>

            <AnimatePresence>

                {

                    open &&

                    <motion.div

                        className="modal-overlay"

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                    >

                        <motion.div

                            className="job-modal"

                            initial={{
                                scale: 0.8,
                                opacity: 0
                            }}

                            animate={{
                                scale: 1,
                                opacity: 1
                            }}

                            exit={{
                                scale: 0.8,
                                opacity: 0
                            }}

                        >

                            <div className="modal-header">

                                <h2>

                                    {

                                        editData

                                            ? "Edit Job Application"

                                            : "Add Job Application"

                                    }

                                </h2>

                                <button

                                    type="button"

                                    onClick={closeModal}

                                >

                                    <FaTimes />

                                </button>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <input

                                    name="company"

                                    placeholder="Company"

                                    value={form.company}

                                    onChange={handleChange}

                                    required

                                />

                                <input

                                    name="role"

                                    placeholder="Role"

                                    value={form.role}

                                    onChange={handleChange}

                                    required

                                />

                                <input

                                    name="location"

                                    placeholder="Location"

                                    value={form.location}

                                    onChange={handleChange}

                                />

                                <input

                                    name="jobUrl"

                                    placeholder="Job URL"

                                    value={form.jobUrl}

                                    onChange={handleChange}

                                />

                                <input

                                    name="salary"

                                    placeholder="Salary"

                                    value={form.salary}

                                    onChange={handleChange}

                                />

                                <select

                                    name="status"

                                    value={form.status}

                                    onChange={handleChange}

                                >

                                    <option>Applied</option>

                                    <option>Shortlisted</option>

                                    <option>Assessment</option>

                                    <option>Interview</option>

                                    <option>Offer</option>

                                    <option>Rejected</option>

                                    <option>Accepted</option>

                                </select>

                                <select

                                    name="priority"

                                    value={form.priority}

                                    onChange={handleChange}

                                >

                                    <option>High</option>

                                    <option>Medium</option>

                                    <option>Low</option>

                                </select>

                                <label>

                                    Applied Date

                                </label>

                                <input

                                    type="date"

                                    name="appliedDate"

                                    value={form.appliedDate}

                                    onChange={handleChange}

                                />

                                <label>

                                    Interview Date

                                </label>

                                <input

                                    type="date"

                                    name="interviewDate"

                                    value={form.interviewDate}

                                    onChange={handleChange}

                                />

                                <textarea

                                    name="notes"

                                    placeholder="Notes"

                                    value={form.notes}

                                    onChange={handleChange}

                                />

                                <button

                                    className="save-btn"

                                    type="submit"

                                >

                                    {

                                        editData

                                            ? "Update Application"

                                            : "Save Application"

                                    }

                                </button>

                            </form>

                        </motion.div>

                    </motion.div>

                }

            </AnimatePresence>

        </>

    );

}

export default AddApplication;
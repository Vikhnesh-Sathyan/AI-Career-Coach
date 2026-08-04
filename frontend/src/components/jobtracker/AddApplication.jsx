import "../../styles/addapplication.css";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {

    FaPlus,

    FaTimes

} from "react-icons/fa";

import {

    addApplication

} from "../../services/jobTrackerService";

function AddApplication({ refresh }) {

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({

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

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        const data = await addApplication(

            form,

            token

        );

        if (data.success) {

            refresh();

            setOpen(false);

            setForm({

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

            });

        }

        else {

            alert(data.message);

        }

    };

    return (

        <>

            <button

                className="new-job-btn"

                onClick={() => setOpen(true)}

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

                                scale: .8,

                                opacity: 0

                            }}

                            animate={{

                                scale: 1,

                                opacity: 1

                            }}

                            exit={{

                                scale: .8,

                                opacity: 0

                            }}

                        >

                            <div className="modal-header">

                                <h2>

                                    Add Job Application

                                </h2>

                                <button

                                    onClick={() => setOpen(false)}

                                >

                                    <FaTimes />

                                </button>

                            </div>

                            <form

                                onSubmit={handleSubmit}

                            >

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

                                    Save Application

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
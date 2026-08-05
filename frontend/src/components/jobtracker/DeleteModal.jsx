import "../../styles/deletemodal.css";

import { motion, AnimatePresence } from "framer-motion";

import {
    FaTrashAlt,
    FaTimes
} from "react-icons/fa";

function DeleteModal({

    open,

    title,

    company,

    onCancel,

    onDelete

}) {

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        className="delete-overlay"

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        onClick={onCancel}

                    >

                        <motion.div

                            className="delete-modal"

                            initial={{

                                scale: 0.85,

                                opacity: 0,

                                y: 30

                            }}

                            animate={{

                                scale: 1,

                                opacity: 1,

                                y: 0

                            }}

                            exit={{

                                scale: 0.85,

                                opacity: 0,

                                y: 30

                            }}

                            transition={{

                                duration: 0.25

                            }}

                            onClick={(e) => e.stopPropagation()}

                        >

                            <div className="delete-icon">

                                <FaTrashAlt />

                            </div>

                            <h2>

                                Delete Application

                            </h2>

                            <p>

                                Are you sure you want to delete

                                <br />

                                <strong>

                                    {title}

                                </strong>

                                {" "}at{" "}

                                <strong>

                                    {company}

                                </strong>

                                ?

                            </p>

                            <span>

                                This action cannot be undone.

                            </span>

                            <div className="delete-buttons">

                                <button

                                    type="button"

                                    className="cancel-btn"

                                    onClick={onCancel}

                                >

                                    <FaTimes />

                                    Cancel

                                </button>

                                <button

                                    type="button"

                                    className="confirm-btn"

                                    onClick={onDelete}

                                >

                                    <FaTrashAlt />

                                    Delete

                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

}

export default DeleteModal;
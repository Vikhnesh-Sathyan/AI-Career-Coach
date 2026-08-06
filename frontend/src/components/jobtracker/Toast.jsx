import "../../styles/toast.css";

import { AnimatePresence, motion } from "framer-motion";

import {
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle
} from "react-icons/fa";

function Toast({

    open,

    message,

    type = "success"

}) {

    const icons = {

        success: <FaCheckCircle />,

        error: <FaExclamationCircle />,

        info: <FaInfoCircle />

    };

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        className={`toast ${type}`}

                        initial={{

                            opacity:0,

                            x:120

                        }}

                        animate={{

                            opacity:1,

                            x:0

                        }}

                        exit={{

                            opacity:0,

                            x:120

                        }}

                        transition={{

                            duration:.25

                        }}

                    >

                        <span className="toast-icon">

                            {icons[type]}

                        </span>

                        <span>

                            {message}

                        </span>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

}

export default Toast;
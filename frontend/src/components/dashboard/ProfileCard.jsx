import "../../styles/profilecard.css";

import { motion } from "framer-motion";

import {
    FaUserCircle,
    FaChartLine,
    FaBriefcase,
    FaMicrophone,
    FaCode,
    FaFire
} from "react-icons/fa";

function ProfileCard() {

    return (

        <motion.div

            className="profile-card"

            initial={{ opacity:0,y:40 }}

            animate={{ opacity:1,y:0 }}

            transition={{ duration:.6 }}

        >

            <div className="profile-top">

                <FaUserCircle className="profile-avatar"/>

                <div>

                    <h2>Vikhnesh</h2>

                    <span>Full Stack Developer</span>

                </div>

            </div>

            <div className="profile-stats">

                <div>

                    <FaChartLine/>

                    <span>ATS</span>

                    <strong>84%</strong>

                </div>

                <div>

                    <FaBriefcase/>

                    <span>Jobs</span>

                    <strong>18</strong>

                </div>

                <div>

                    <FaMicrophone/>

                    <span>Interviews</span>

                    <strong>12</strong>

                </div>

                <div>

                    <FaCode/>

                    <span>Skills</span>

                    <strong>24</strong>

                </div>

            </div>

            <div className="career-level">

                <div className="level-title">

                    <FaFire/>

                    Career Level

                </div>

                <h3>Level 2 Explorer</h3>

                <div className="level-bar">

                    <div className="level-fill"></div>

                </div>

                <small>80 XP to Level 3</small>

            </div>

        </motion.div>

    );

}

export default ProfileCard;
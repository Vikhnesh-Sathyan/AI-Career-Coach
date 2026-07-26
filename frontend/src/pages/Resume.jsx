import "../styles/resume.css";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import ResumeUpload from "../components/resume/ResumeUpload";

function Resume() {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="resume-container">

                    <div className="resume-header">

                        <h1>Resume Analyzer</h1>

                        <p>
                            Upload your resume and receive AI-powered ATS insights.
                        </p>

                    </div>

                    <ResumeUpload />

                </div>

            </div>

        </div>

    );

}

export default Resume;
import "../../styles/jdinput.css";

import { useState } from "react";

import {
    FaUpload,
    FaSearch,
    FaFileAlt
} from "react-icons/fa";

import { analyzeJobMatch } from "../../services/jobMatcherService";

import { saveJobMatch } from "../../services/jobHistoryService";


function JDInput({ setResult, setLoading, loading }) {


    const [jobDescription, setJobDescription] = useState("");

    const [resume, setResume] = useState(null);



    const handleAnalyze = async () => {


        if (!resume) {

            alert("Please upload your resume.");

            return;

        }


        if (!jobDescription.trim()) {

            alert("Please paste a Job Description.");

            return;

        }



        try {


            setLoading(true);



            // Analyze with Flask AI Matcher

            const data = await analyzeJobMatch(

                resume,

                jobDescription

            );



            console.log("Match Result:", data);



            if(data.success){


                // Display result

                setResult(data);



                // Save result into MongoDB

                const token = localStorage.getItem("token");


                if(token){


                    const savedData = await saveJobMatch(

                        {

                            jobDescription,

                            matchScore:data.matchScore,

                            matchedSkills:data.matchedSkills,

                            missingSkills:data.missingSkills,

                            suggestions:data.suggestions

                        },

                        token

                    );


                    console.log(
                        "Saved History:",
                        savedData
                    );


                }
                else{

                    console.log(
                        "No token found. Match not saved."
                    );

                }


            }
            else{


                alert(data.message);


            }



        } 
        catch(error) {


            console.error(
                "Job Match Error:",
                error
            );


            alert(
                "Failed to analyze job match."
            );


        }
        finally {


            setLoading(false);


        }


    };




    const handleReset = ()=>{


        setResume(null);

        setJobDescription("");

        setResult(null);


    };




    return (

        <div className="jd-card">


            <h2>

                Job Description Matcher

            </h2>


            <p>

                Upload your resume and compare it with the job requirements.

            </p>




            <textarea


                placeholder="Paste Job Description here..."


                value={jobDescription}


                onChange={(e)=>

                    setJobDescription(e.target.value)

                }


            />





            <div className="upload-section">


                <label className="upload-btn">


                    <FaUpload />


                    Upload Resume




                    <input


                        type="file"


                        accept=".pdf"


                        hidden



                        onChange={(e)=>{


                            const file =
                            e.target.files[0];



                            if(

                                file &&

                                file.type === "application/pdf"

                            ){

                                setResume(file);

                            }

                            else{


                                alert(
                                    "Please upload PDF file only."
                                );


                            }


                        }}


                    />


                </label>





                {


                    resume && (


                        <div className="resume-name">


                            <FaFileAlt />


                            {resume.name}


                        </div>


                    )


                }



            </div>





            <button


                className="analyze-btn"


                onClick={handleAnalyze}


                disabled={loading}



            >


                <FaSearch />



                {


                    loading

                    ?

                    "Analyzing..."

                    :

                    "Analyze Match"


                }



            </button>






            <button


                className="reset-btn"


                onClick={handleReset}


            >


                Reset


            </button>



        </div>

    );

}


export default JDInput;
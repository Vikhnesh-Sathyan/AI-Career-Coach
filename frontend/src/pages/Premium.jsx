import { useEffect, useState } from "react";

import {
    FaCrown,
    FaCheck,
    FaStar,
    FaArrowLeft
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
    getPremiumStatus,
    upgradeToPremium
} from "../services/premiumService";

import "../styles/premium.css";


function Premium() {


    const navigate =
        useNavigate();


    // ===============================
    // STATE
    // ===============================

    const [subscription, setSubscription] =
        useState({
            plan: "Free",
            status: "active"
        });


    const [loading, setLoading] =
        useState(true);


    const [upgrading, setUpgrading] =
        useState(false);


    // ===============================
    // LOAD PREMIUM STATUS
    // ===============================

    const loadPremiumStatus =
        async () => {

            try {

                setLoading(true);


                const response =
                    await getPremiumStatus();


                if (
                    response?.success
                ) {

                    setSubscription(
                        response.data.subscription
                    );

                }

            }

            catch (error) {

                console.error(
                    "Premium status error:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        loadPremiumStatus();

    }, []);


    // ===============================
    // UPGRADE
    // ===============================

    const handleUpgrade =
        async () => {

            try {

                setUpgrading(true);


                const response =
                    await upgradeToPremium();


                if (
                    response?.success
                ) {

                    setSubscription(
                        response.data.subscription
                    );

                    alert(
                        "Successfully upgraded to Premium!"
                    );

                }

            }

            catch (error) {

                console.error(
                    "Premium upgrade error:",
                    error
                );


                alert(
                    error?.response
                        ?.data
                        ?.message ||
                    "Failed to upgrade."
                );

            }

            finally {

                setUpgrading(false);

            }

        };


    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (

            <div className="premium-loading">

                Loading premium details...

            </div>

        );

    }


    const isPremium =
        subscription?.plan === "Premium";


    return (

        <div className="premium-page">


            {/* =============================
                HEADER
            ============================= */}

            <div className="premium-header">

                <button
                    className="premium-back-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <FaArrowLeft />

                    Back

                </button>


                <div>

                    <span>

                        CAREERCOACH PREMIUM

                    </span>


                    <h1>

                        Unlock Your Full Career Potential

                    </h1>


                    <p>

                        Get access to powerful tools
                        designed to help you land
                        your dream job faster.

                    </p>

                </div>

            </div>


            {/* =============================
                CURRENT PLAN
            ============================= */}

            <div className="current-plan-card">

                <div className="current-plan-icon">

                    <FaCrown />

                </div>


                <div>

                    <span>

                        CURRENT PLAN

                    </span>


                    <h2>

                        {subscription?.plan}

                    </h2>


                    <p>

                        Status:
                        {" "}

                        <strong>

                            {subscription?.status}

                        </strong>

                    </p>

                </div>

            </div>


            {/* =============================
                PLANS
            ============================= */}

            <div className="premium-plans">


                {/* FREE PLAN */}

                <div className="plan-card free-plan">

                    <div className="plan-icon">

                        <FaStar />

                    </div>


                    <h2>

                        Free

                    </h2>


                    <h1>

                        ₹0

                    </h1>


                    <p>

                        Basic career tools

                    </p>


                    <ul>

                        <li>

                            <FaCheck />

                            Resume Management

                        </li>


                        <li>

                            <FaCheck />

                            Job Tracking

                        </li>


                        <li>

                            <FaCheck />

                            Basic ATS Score

                        </li>


                    </ul>


                    <button
                        disabled={
                            subscription?.plan ===
                            "Free"
                        }
                    >

                        {subscription?.plan ===
                        "Free"

                            ? "Current Plan"

                            : "Free Plan"

                        }

                    </button>

                </div>


                {/* PREMIUM PLAN */}

                <div className="plan-card premium-plan">


                    <div className="popular-badge">

                        MOST POPULAR

                    </div>


                    <div className="plan-icon crown">

                        <FaCrown />

                    </div>


                    <h2>

                        Premium

                    </h2>


                    <h1>

                        ₹499

                        <small>

                            / month

                        </small>

                    </h1>


                    <p>

                        Advanced career tools

                    </p>


                    <ul>

                        <li>

                            <FaCheck />

                            Everything in Free

                        </li>


                        <li>

                            <FaCheck />

                            Advanced ATS Analysis

                        </li>


                        <li>

                            <FaCheck />

                            AI Resume Suggestions

                        </li>


                        <li>

                            <FaCheck />

                            Advanced Job Matching

                        </li>


                        <li>

                            <FaCheck />

                            Interview Preparation Tools

                        </li>


                        <li>

                            <FaCheck />

                            Priority Support

                        </li>

                    </ul>


                    <button
                        className="premium-upgrade-btn"
                        onClick={
                            handleUpgrade
                        }
                        disabled={
                            isPremium ||
                            upgrading
                        }
                    >

                        <FaCrown />

                        {isPremium

                            ? "Premium Active"

                            : upgrading

                                ? "Upgrading..."

                                : "Upgrade to Premium"

                        }

                    </button>

                </div>


            </div>


            {/* =============================
                PREMIUM BENEFITS
            ============================= */}

            <div className="premium-benefits">


                <h2>

                    Why Choose Premium?

                </h2>


                <div className="benefits-grid">


                    <div>

                        <FaCrown />

                        <h3>

                            Advanced Tools

                        </h3>

                        <p>

                            Get deeper insights
                            into your resume and
                            job applications.

                        </p>

                    </div>


                    <div>

                        <FaStar />

                        <h3>

                            Better Matches

                        </h3>

                        <p>

                            Discover jobs that
                            better match your
                            skills and profile.

                        </p>

                    </div>


                    <div>

                        <FaCheck />

                        <h3>

                            Career Growth

                        </h3>

                        <p>

                            Use AI-powered tools
                            to improve your
                            career journey.

                        </p>

                    </div>


                </div>


            </div>


        </div>

    );

}


export default Premium;
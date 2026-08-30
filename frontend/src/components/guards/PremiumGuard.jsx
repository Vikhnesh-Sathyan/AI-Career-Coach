import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    FaLock,
    FaCrown,
    FaSyncAlt
} from "react-icons/fa";

import {
    checkPremiumFeature
} from "../../services/premiumService";

import "../styles/premiumGuard.css";


function PremiumGuard({
    children
}) {

    const navigate =
        useNavigate();


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        hasAccess,
        setHasAccess
    ] = useState(false);


    // ======================================
    // CHECK PREMIUM ACCESS
    // ======================================

    const checkAccess =
        async () => {

            try {

                setLoading(true);


                const response =
                    await checkPremiumFeature();


                if (
                    response?.success
                ) {

                    setHasAccess(true);

                }

                else {

                    setHasAccess(false);

                }

            }

            catch (error) {

                console.error(
                    "Premium access error:",
                    error
                );


                setHasAccess(false);

            }

            finally {

                setLoading(false);

            }

        };


    // ======================================
    // CHECK ON PAGE LOAD
    // ======================================

    useEffect(() => {

        checkAccess();

    }, []);


    // ======================================
    // LOADING
    // ======================================

    if (loading) {

        return (

            <div className="premium-guard-loading">

                <FaSyncAlt
                    className="premium-spinner"
                />

                <p>
                    Checking Premium access...
                </p>

            </div>

        );

    }


    // ======================================
    // PREMIUM USER
    // ======================================

    if (hasAccess) {

        return children;

    }


    // ======================================
    // FREE USER
    // ======================================

    return (

        <div className="premium-guard">

            <div className="premium-lock-box">

                <FaLock
                    className="premium-lock-icon"
                />

            </div>


            <span className="premium-guard-label">

                PREMIUM FEATURE

            </span>


            <h2>

                Unlock Advanced Features

            </h2>


            <p>

                This feature is available only
                for Premium members.

            </p>


            <button

                className="premium-upgrade-btn"

                onClick={
                    () =>
                        navigate("/premium")
                }

            >

                <FaCrown />

                Upgrade to Premium

            </button>

        </div>

    );

}


export default PremiumGuard;
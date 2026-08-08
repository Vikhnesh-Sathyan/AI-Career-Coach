import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


function AdminProtectedRoute({ children }) {

    const [checking, setChecking] =
        useState(true);

    const [isAdmin, setIsAdmin] =
        useState(false);


    useEffect(() => {

        const verifyAdmin = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                // No token = not logged in
                if (!token) {

                    setIsAdmin(false);

                    setChecking(false);

                    return;

                }


                const response = await fetch(

                    "http://localhost:5000/api/auth/profile",

                    {

                        method: "GET",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


                const data =
                    await response.json();


                if (

                    response.ok &&

                    data.success &&

                    data.user?.role === "admin"

                ) {

                    setIsAdmin(true);

                }

                else {

                    setIsAdmin(false);

                }

            }

            catch (error) {

                console.error(
                    "Admin verification failed:",
                    error
                );

                setIsAdmin(false);

            }

            finally {

                setChecking(false);

            }

        };


        verifyAdmin();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (checking) {

        return (

            <div className="admin-route-loading">

                <div className="admin-route-spinner" />

                <p>
                    Verifying administrator access...
                </p>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Not Admin
    |--------------------------------------------------------------------------
    */

    if (!isAdmin) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    return children;

}


export default AdminProtectedRoute;
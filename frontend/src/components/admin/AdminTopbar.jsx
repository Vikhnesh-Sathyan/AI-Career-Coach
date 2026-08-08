import {
    Search,
    Bell,
    MoreVertical,
    RefreshCw,
    Settings,
    LogOut
} from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/admintopbar.css";


function AdminTopbar() {

    const [menuOpen, setMenuOpen] =
        useState(false);

    const menuRef = useRef(null);

    const navigate = useNavigate();


    // =====================================
    // Close menu when clicking outside
    // =====================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setMenuOpen(false);

            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // =====================================
    // Refresh
    // =====================================

    const handleRefresh = () => {

        setMenuOpen(false);

        window.location.reload();

    };


    // =====================================
    // Admin Settings
    // =====================================

    const handleSettings = () => {

        setMenuOpen(false);

        navigate("/settings");

    };


    // =====================================
    // Logout
    // =====================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setMenuOpen(false);

        navigate("/");

    };


    return (

        <header className="admin-topbar">

            {/* PAGE INFORMATION */}

            <div className="admin-page-info">

                <h1>
                    Admin Dashboard
                </h1>

                <span>
                    Manage your CareerCoach platform
                </span>

            </div>


            {/* SEARCH */}

            <div className="admin-command">

                <Search size={19} />

                <input
                    type="text"
                    placeholder="Search users, jobs, resumes..."
                />

                <kbd>
                    /
                </kbd>

            </div>


            {/* ACTIONS */}

            <div className="admin-actions">

                {/* Notification */}

                <button
                    className="admin-icon-button"
                    title="Notifications"
                >

                    <Bell size={20} />

                    <span className="notification-dot" />

                </button>


                {/* More Menu */}

                <div
                    className="admin-more-wrapper"
                    ref={menuRef}
                >

                    <button
                        className="admin-icon-button"
                        title="More options"
                        onClick={() =>
                            setMenuOpen(
                                !menuOpen
                            )
                        }
                    >

                        <MoreVertical
                            size={20}
                        />

                    </button>


                    {/* Dropdown */}

                    {menuOpen && (

                        <div className="admin-dropdown">

                            <button
                                onClick={
                                    handleRefresh
                                }
                            >

                                <RefreshCw
                                    size={16}
                                />

                                <span>
                                    Refresh Data
                                </span>

                            </button>


                            <button
                                onClick={
                                    handleSettings
                                }
                            >

                                <Settings
                                    size={16}
                                />

                                <span>
                                    Admin Settings
                                </span>

                            </button>


                            <div className="admin-dropdown-divider" />


                            <button
                                className="admin-logout"
                                onClick={
                                    handleLogout
                                }
                            >

                                <LogOut
                                    size={16}
                                />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}


export default AdminTopbar;
import {
    Search,
    Bell,
    MoreVertical
} from "lucide-react";

import "../../styles/admintopbar.css";

function AdminTopbar() {

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


                {/* More */}

                <button
                    className="admin-icon-button"
                    title="More options"
                >

                    <MoreVertical size={20} />

                </button>

            </div>

        </header>

    );

}

export default AdminTopbar;
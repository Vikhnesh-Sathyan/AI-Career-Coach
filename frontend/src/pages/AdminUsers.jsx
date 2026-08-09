import {
    useState,
    useEffect
} from "react";

import {
    Search,
    MoreVertical,
    Users,
    ShieldCheck,
    Crown,
    UserCheck,
    UserX,
    Eye,
    Trash2
} from "lucide-react";

import "../styles/adminusers.css";

import {
    getAdminUsers,
    updateUserStatus,
    deleteAdminUser
} from "../services/adminService.js";

import toast from "react-hot-toast";

function AdminUsers() {

    // =====================================
    // USERS
    // =====================================

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // =====================================
    // STATES
    // =====================================

    const [search, setSearch] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState("All");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [openMenu, setOpenMenu] =
        useState(null);


    // =====================================
    // LOAD USERS
    // =====================================
useEffect(() => {

    const loadUsers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response =
                await getAdminUsers(token);

            if (response.success) {

                setUsers(
                    response.data || []
                );

            }

        } catch (error) {

            console.error(
                "Admin users loading error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    loadUsers();

}, []);


    // =====================================
    // SEARCH + FILTERS
    // =====================================

    const filteredUsers =
        users.filter((user) => {

            const searchValue =
                search.toLowerCase();


            const searchMatch =
                user.name
                    .toLowerCase()
                    .includes(searchValue) ||

                user.email
                    .toLowerCase()
                    .includes(searchValue);


            const roleMatch =
                roleFilter === "All" ||
                user.role === roleFilter;


            const statusMatch =
                statusFilter === "All" ||
                user.status === statusFilter;


            return (
                searchMatch &&
                roleMatch &&
                statusMatch
            );

        });


    // =====================================
    // SUSPEND / ACTIVATE
    // =====================================
const toggleStatus = async (id) => {

    try {

        const token =
            localStorage.getItem("token");

        const currentUser =
            users.find(
                (user) => user.id === id
            );

        if (!currentUser) {
            return;
        }

        const newStatus =
            currentUser.status === "Active"
                ? "suspended"
                : "active";


        const response =
            await updateUserStatus(
                token,
                id,
                newStatus
            );


        if (!response.success) {

            toast.error(
                response.message ||
                "Unable to update user"
            );

            return;
        }


        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status:
                            response.data?.status ||
                            (
                                newStatus === "suspended"
                                    ? "Suspended"
                                    : "Active"
                            )
                    }
                    : user
            )
        );


        setOpenMenu(null);


        // SUCCESS TOAST

        if (newStatus === "suspended") {

            toast.success(
                `${currentUser.name} has been suspended`
            );

        } else {

            toast.success(
                `${currentUser.name} has been activated`
            );

        }

    }

    catch (error) {

        console.error(
            "Toggle user status error:",
            error
        );

        toast.error(
            "Unable to update user status"
        );

    }

};


    // =====================================
    // DELETE USER
    // =====================================

const deleteUser = async (id) => {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this user?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const token =
            localStorage.getItem("token");


        const response =
            await deleteAdminUser(
                token,
                id
            );


        // =================================
        // ERROR FROM BACKEND
        // =================================

        if (!response.success) {

            toast.error(
                response.message ||
                "Unable to delete user"
            );

            return;
        }


        // =================================
        // REMOVE USER FROM UI
        // =================================

        setUsers((currentUsers) =>
            currentUsers.filter(
                (user) =>
                    user.id !== id
            )
        );


        setOpenMenu(null);


        // =================================
        // SUCCESS TOAST
        // =================================

        toast.success(
            "User deleted successfully"
        );

    }

    catch (error) {

        console.error(
            "Delete user error:",
            error
        );


        toast.error(
            "Unable to delete user"
        );

    }

};



    // =====================================
    // VIEW USER
    // =====================================

    const viewUser = (user) => {

        alert(
            `Name: ${user.name}\n` +
            `Email: ${user.email}\n` +
            `Role: ${user.role}\n` +
            `Plan: ${user.plan}\n` +
            `Status: ${user.status}`
        );


        setOpenMenu(null);

    };


    // =====================================
    // STATISTICS
    // =====================================

    const totalUsers =
        users.length;


    const activeUsers =
        users.filter(
            (user) =>
                user.status === "Active"
        ).length;


    const premiumUsers =
        users.filter(
            (user) =>
                user.plan === "Premium"
        ).length;


    const adminUsers =
        users.filter(
            (user) =>
                user.role === "Admin"
        ).length;


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="admin-users-page">

                <div className="admin-empty">

                    Loading users...

                </div>

            </div>

        );

    }


    // =====================================
    // PAGE
    // =====================================

    return (

        <div className="admin-users-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="admin-users-header">

                <div>

                    <h1>
                        User Management
                    </h1>

                    <p>
                        Manage users and their
                        platform access.
                    </p>

                </div>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="admin-user-stats">


                {/* Total Users */}

                <div className="admin-user-stat-card">

                    <div className="admin-stat-icon blue">

                        <Users size={20} />

                    </div>

                    <div>

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {totalUsers}
                        </strong>

                    </div>

                </div>


                {/* Active Users */}

                <div className="admin-user-stat-card">

                    <div className="admin-stat-icon green">

                        <UserCheck size={20} />

                    </div>

                    <div>

                        <span>
                            Active Users
                        </span>

                        <strong>
                            {activeUsers}
                        </strong>

                    </div>

                </div>


                {/* Premium Users */}

                <div className="admin-user-stat-card">

                    <div className="admin-stat-icon gold">

                        <Crown size={20} />

                    </div>

                    <div>

                        <span>
                            Premium Users
                        </span>

                        <strong>
                            {premiumUsers}
                        </strong>

                    </div>

                </div>


                {/* Admins */}

                <div className="admin-user-stat-card">

                    <div className="admin-stat-icon purple">

                        <ShieldCheck size={20} />

                    </div>

                    <div>

                        <span>
                            Admins
                        </span>

                        <strong>
                            {adminUsers}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================
                MAIN CARD
            ================================= */}

            <div className="admin-users-card">


                {/* =================================
                    TOOLBAR
                ================================= */}

                <div className="admin-users-toolbar">


                    {/* Search */}

                    <div className="admin-user-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Role */}

                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Roles
                        </option>

                        <option value="Admin">
                            Admin
                        </option>

                        <option value="User">
                            User
                        </option>

                    </select>


                    {/* Status */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Suspended">
                            Suspended
                        </option>

                    </select>

                </div>


                {/* =================================
                    TABLE
                ================================= */}

                <div className="admin-users-table-wrap">

                    <table className="admin-users-table">

                        <thead>

                            <tr>

                                <th>
                                    User
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Plan
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="admin-empty"
                                    >

                                        No users found.

                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map(
                                    (user) => (

                                        <tr
                                            key={user.id}
                                        >


                                            {/* USER */}

                                            <td>

                                                <div className="admin-user-info">

                                                    <div className="admin-user-avatar">

                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {user.name}
                                                        </strong>

                                                        <span>
                                                            {user.email}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* ROLE */}

                                            <td>

                                                <span
                                                    className={
                                                        `admin-role-badge ${
                                                            user.role.toLowerCase()
                                                        }`
                                                    }
                                                >

                                                    {user.role}

                                                </span>

                                            </td>


                                            {/* PLAN */}

                                            <td>

                                                <span
                                                    className={
                                                        `admin-plan-badge ${
                                                            user.plan.toLowerCase()
                                                        }`
                                                    }
                                                >

                                                    {user.plan === "Premium" && (

                                                        <Crown
                                                            size={13}
                                                        />

                                                    )}

                                                    {user.plan}

                                                </span>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        `admin-status-badge ${
                                                            user.status.toLowerCase()
                                                        }`
                                                    }
                                                >

                                                    ● {user.status}

                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="admin-user-action">


                                                    <button
                                                        className="admin-user-more"
                                                        onClick={() =>
                                                            setOpenMenu(
                                                                openMenu === user.id
                                                                    ? null
                                                                    : user.id
                                                            )
                                                        }
                                                    >

                                                        <MoreVertical
                                                            size={18}
                                                        />

                                                    </button>


                                                    {openMenu === user.id && (

                                                        <div className="admin-user-dropdown">


                                                            {/* VIEW */}

                                                            <button
                                                                onClick={() =>
                                                                    viewUser(
                                                                        user
                                                                    )
                                                                }
                                                            >

                                                                <Eye
                                                                    size={15}
                                                                />

                                                                View User

                                                            </button>


                                                            {/* STATUS */}

                                                            <button
                                                                onClick={() =>
                                                                    toggleStatus(user.id)
                                                                }
                                                            >
                                                                {user.status === "Active"

                                                                    ? (<UserX
                                                                        size={15}
                                                                    />  )
                                                                    : (<UserCheck
                                                                        size={15}
                                                                    />  )   
                                                                }
                                                                
                                                                {user.status === "Active"
                                                                    ? "Suspend User"
                                                                    : "Activate User"
                                                                }
                                                            </button>

                                                            
                                                            {/* DELETE */}

                                                            <button
                                                                className="delete-action"
                                                                onClick={() =>
                                                                    deleteUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >

                                                                <Trash2
                                                                    size={15}
                                                                />

                                                                Delete User

                                                            </button>


                                                        </div>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>

                                    )

                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}


export default AdminUsers;
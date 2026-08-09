import { useState } from "react";

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


function AdminUsers() {

    // =====================================
    // Static Demo Users
    // =====================================

    const [users, setUsers] = useState([

        {
            id: 1,
            name: "Vikhnesh Sathyan",
            email: "vikhnesh@example.com",
            role: "Admin",
            plan: "Premium",
            status: "Active"
        },

        {
            id: 2,
            name: "Rahul Kumar",
            email: "rahul@example.com",
            role: "User",
            plan: "Free",
            status: "Active"
        },

        {
            id: 3,
            name: "Anu Thomas",
            email: "anu@example.com",
            role: "User",
            plan: "Premium",
            status: "Active"
        },

        {
            id: 4,
            name: "Arjun Menon",
            email: "arjun@example.com",
            role: "User",
            plan: "Free",
            status: "Suspended"
        },

        {
            id: 5,
            name: "Neha Raj",
            email: "neha@example.com",
            role: "User",
            plan: "Premium",
            status: "Active"
        }

    ]);


    // =====================================
    // States
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
    // Search + Filters
    // =====================================

    const filteredUsers =
        users.filter((user) => {

            const searchMatch =
                user.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                user.email
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


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
    // Suspend / Activate
    // =====================================

    const toggleStatus = (id) => {

        setUsers((currentUsers) =>

            currentUsers.map((user) =>

                user.id === id

                    ? {
                        ...user,
                        status:
                            user.status === "Active"
                                ? "Suspended"
                                : "Active"
                    }

                    : user

            )

        );

        setOpenMenu(null);

    };


    // =====================================
    // Delete User
    // =====================================

    const deleteUser = (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );


        if (!confirmed) {
            return;
        }


        setUsers((currentUsers) =>
            currentUsers.filter(
                (user) =>
                    user.id !== id
            )
        );


        setOpenMenu(null);

    };


    // =====================================
    // View User
    // =====================================

    const viewUser = (user) => {

        alert(
            `Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nPlan: ${user.plan}\nStatus: ${user.status}`
        );

        setOpenMenu(null);

    };


    // =====================================
    // Statistics
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


    return (

        <div className="admin-users-page">


            {/* =================================
                Header
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
                Statistics
            ================================= */}

            <div className="admin-user-stats">

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
                Main Card
            ================================= */}

            <div className="admin-users-card">


                {/* Toolbar */}

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
                    Table
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

                                            {/* User */}

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


                                            {/* Role */}

                                            <td>

                                                <span
                                                    className={`admin-role-badge ${user.role.toLowerCase()}`}
                                                >

                                                    {user.role}

                                                </span>

                                            </td>


                                            {/* Plan */}

                                            <td>

                                                <span
                                                    className={`admin-plan-badge ${user.plan.toLowerCase()}`}
                                                >

                                                    {user.plan === "Premium" && (
                                                        <Crown
                                                            size={13}
                                                        />
                                                    )}

                                                    {user.plan}

                                                </span>

                                            </td>


                                            {/* Status */}

                                            <td>

                                                <span
                                                    className={`admin-status-badge ${user.status.toLowerCase()}`}
                                                >

                                                    {user.status === "Active"
                                                        ? "●"
                                                        : "●"}

                                                    {" "}

                                                    {user.status}

                                                </span>

                                            </td>


                                            {/* Actions */}

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


                                                            <button
                                                                onClick={() =>
                                                                    toggleStatus(
                                                                        user.id
                                                                    )
                                                                }
                                                            >

                                                                {user.status === "Active"
                                                                    ? <UserX size={15} />
                                                                    : <UserCheck size={15} />
                                                                }

                                                                {user.status === "Active"
                                                                    ? "Suspend User"
                                                                    : "Activate User"
                                                                }

                                                            </button>


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
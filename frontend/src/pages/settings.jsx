import "../styles/settings.css";

import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import {
    FaBell,
    FaBriefcase,
    FaCheck,
    FaCreditCard,
    FaCrown,
    FaLock,
    FaShieldAlt,
    FaUser
} from "react-icons/fa";

import {
    getSettings,
    updateCareer,
    updateNotifications,
    updateProfile,
    updateSubscription
} from "../services/settingsService";

const TABS = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "career", label: "Career", icon: FaBriefcase },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "subscription", label: "Subscription", icon: FaCreditCard }
];

const PLANS = [
    {
        id: "Free",
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Get started with essential career tools",
        features: [
            "5 resume analyses per month",
            "Basic job matching",
            "2 mock interviews per month",
            "Email support"
        ],
        highlight: false
    },
    {
        id: "Premium",
        name: "Premium",
        price: "$9.99",
        period: "per month",
        description: "Unlock the full power of AI career coaching",
        features: [
            "Unlimited resume analyses",
            "Advanced AI job matching",
            "Unlimited mock interviews",
            "Priority support",
            "ATS optimization",
            "Career insights dashboard"
        ],
        highlight: true
    }
];

const USAGE_LIMITS = {
    Free: {
        resumeAnalyses: {
            used: 3,
            limit: 5,
            label: "Resume analyses"
        },
        mockInterviews: {
            used: 1,
            limit: 2,
            label: "Mock interviews"
        },
        jobMatches: {
            used: 8,
            limit: 15,
            label: "Job matches"
        }
    },
    Premium: {
        resumeAnalyses: {
            used: 12,
            limit: null,
            label: "Resume analyses"
        },
        mockInterviews: {
            used: 6,
            limit: null,
            label: "Mock interviews"
        },
        jobMatches: {
            used: 24,
            limit: null,
            label: "Job matches"
        }
    }
};

function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function getNextBillingDate(createdAt) {
    const base = createdAt ? new Date(createdAt) : new Date();
    const next = new Date(base);

    next.setMonth(next.getMonth() + 1);

    return next.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function Settings() {
    const [settings, setSettings] = useState(null);

    const [activeTab, setActiveTab] = useState("profile");

    const [formData, setFormData] = useState({
        name: "",
        bio: ""
    });

    const [careerData, setCareerData] = useState({
        targetRole: "",
        experience: "",
        location: ""
    });

    const [savingProfile, setSavingProfile] = useState(false);
    const [savingCareer, setSavingCareer] = useState(false);

    const [subscriptionLoading, setSubscriptionLoading] = useState(false);

    const [pendingPlan, setPendingPlan] = useState(null);

    const currentPlan =
        settings?.subscription?.plan || "Free";

    const usage =
        USAGE_LIMITS[currentPlan] || USAGE_LIMITS.Free;

    const billingHistory = useMemo(() => {
        if (currentPlan !== "Premium") {
            return [];
        }

        const recent = settings?.createdAt
            ? new Date(settings.createdAt)
            : new Date();

        const previous = new Date(recent);

        previous.setMonth(previous.getMonth() - 1);

        const formatDate = (date) =>
            date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });

        return [
            {
                id: 1,
                date: formatDate(recent),
                amount: "$9.99",
                status: "Paid"
            },
            {
                id: 2,
                date: formatDate(previous),
                amount: "$9.99",
                status: "Paid"
            }
        ];
    }, [currentPlan, settings?.createdAt]);

    /*
     * LOAD SETTINGS
     */
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    return;
                }

                const res = await getSettings(token);

                if (res.data.success) {
                    const user = res.data.user;

                    setSettings(user);

                    setFormData({
                        name: user.name || "",
                        bio: user.bio || ""
                    });

                    setCareerData({
                        targetRole:
                            user.careerPreferences?.targetRole || "",

                        experience:
                            user.careerPreferences?.experience || "",

                        location:
                            user.careerPreferences?.location || ""
                    });
                }
            } catch (error) {
                console.error("Failed to load settings:", error);
            }
        };

        loadSettings();
    }, []);

    /*
     * SAVE PROFILE
     */
    const saveProfile = async () => {
        try {
            setSavingProfile(true);

            const token = localStorage.getItem("token");

            const res = await updateProfile(
                formData,
                token
            );

            if (res.data.success) {
                setSettings(res.data.user);
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setSavingProfile(false);
        }
    };

    /*
     * SAVE CAREER
     */
    const saveCareer = async () => {
        try {
            setSavingCareer(true);

            const token = localStorage.getItem("token");

            const res = await updateCareer(
                careerData,
                token
            );

            if (res.data.success) {
                setSettings(res.data.user);
            }
        } catch (error) {
            console.error(
                "Failed to save career preferences:",
                error
            );
        } finally {
            setSavingCareer(false);
        }
    };

    /*
     * TOGGLE NOTIFICATION
     */
    const toggleNotification = async (key) => {
        const updated = {
            ...settings.notifications,
            [key]: !settings.notifications?.[key]
        };

        try {
            const token = localStorage.getItem("token");

            const res = await updateNotifications(
                updated,
                token
            );

            if (res.data.success) {
                setSettings(res.data.user);
            }
        } catch (error) {
            console.error(
                "Failed to update notification:",
                error
            );
        }
    };

    /*
     * APPLY PLAN CHANGE
     */
    const applyPlanChange = async (planId) => {
        if (planId === currentPlan) {
            return;
        }

        try {
            setSubscriptionLoading(true);

            const token = localStorage.getItem("token");

            const res = await updateSubscription(
                planId,
                token
            );

            if (res.data.success) {
                setSettings(res.data.user);
            }
        } catch (error) {
            console.error(
                "Failed to update subscription:",
                error
            );
        } finally {
            setSubscriptionLoading(false);
            setPendingPlan(null);
        }
    };

    /*
     * REQUEST PLAN CHANGE
     */
    const requestPlanChange = (planId) => {
        if (planId === currentPlan) {
            return;
        }

        setPendingPlan(planId);
    };

    /*
     * CANCEL SUBSCRIPTION
     */
    const cancelSubscription = () => {
        if (currentPlan === "Free") {
            return;
        }

        setPendingPlan("Free");
    };

    /*
     * LOADING STATE
     */
    if (!settings) {
        return (
            <div className="dashboard">
                <Sidebar />

                <div className="dashboard-content settings-loading-wrap">
                    <div className="settings-loading">
                        <div className="settings-spinner" />

                        <p>
                            Loading your settings...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="settings-page">

                    {/* HEADER */}
                    <header className="settings-header">

                        <div className="settings-header-text">

                            <h1>
                                Settings
                            </h1>

                            <p>
                                Manage your account, career preferences,
                                and subscription
                            </p>

                        </div>

                    </header>

                    <div className="settings-layout">

                        {/* SETTINGS MENU */}
                        <nav
                            className="settings-menu"
                            aria-label="Settings sections"
                        >

                            {TABS.map(
                                ({
                                    id,
                                    label,
                                    icon: Icon
                                }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        className={
                                            activeTab === id
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setActiveTab(id)
                                        }
                                    >

                                        <Icon className="settings-tab-icon" />

                                        <span>
                                            {label}
                                        </span>

                                    </button>
                                )
                            )}

                        </nav>

                        {/* SETTINGS CONTENT */}
                        <div className="settings-content">

                            {/* PROFILE */}
                            {activeTab === "profile" && (
                                <section className="setting-card">

                                    <div className="setting-card-head">

                                        <h2>
                                            <FaUser />
                                            Profile Settings
                                        </h2>

                                        <p>
                                            Update your personal information
                                            and public profile.
                                        </p>

                                    </div>

                                    <div className="profile-box">

                                        <div className="avatar">
                                            {getInitials(settings.name)}
                                        </div>

                                        <div className="profile-meta">

                                            <strong>
                                                {settings.name ||
                                                    "Your Name"}
                                            </strong>

                                            <span>
                                                {settings.email}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="settings-form-grid">

                                        <div className="form-field">

                                            <label htmlFor="name">
                                                Full Name
                                            </label>

                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value
                                                    })
                                                }
                                            />

                                        </div>

                                        <div className="form-field">

                                            <label htmlFor="email">
                                                Email
                                            </label>

                                            <input
                                                id="email"
                                                type="email"
                                                value={settings.email}
                                                readOnly
                                            />

                                            <span className="field-hint">
                                                Email cannot be changed here
                                            </span>

                                        </div>

                                        <div className="form-field form-field-full">

                                            <label htmlFor="bio">
                                                Bio
                                            </label>

                                            <textarea
                                                id="bio"
                                                value={formData.bio}
                                                placeholder="Tell us about your career goals..."
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        bio: e.target.value
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>

                                    <div className="setting-card-actions">

                                        <button
                                            type="button"
                                            className="save-btn"
                                            onClick={saveProfile}
                                            disabled={savingProfile}
                                        >
                                            {savingProfile
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </button>

                                    </div>

                                </section>
                            )}

                            {/* CAREER */}
                            {activeTab === "career" && (
                                <section className="setting-card">

                                    <div className="setting-card-head">

                                        <h2>
                                            <FaBriefcase />
                                            Career Preferences
                                        </h2>

                                        <p>
                                            Help us tailor job matches
                                            and coaching to your goals.
                                        </p>

                                    </div>

                                    <div className="settings-form-grid">

                                        <div className="form-field">

                                            <label htmlFor="targetRole">
                                                Target Role
                                            </label>

                                            <input
                                                id="targetRole"
                                                type="text"
                                                placeholder="e.g. Frontend Developer"
                                                value={
                                                    careerData.targetRole
                                                }
                                                onChange={(e) =>
                                                    setCareerData({
                                                        ...careerData,
                                                        targetRole:
                                                            e.target.value
                                                    })
                                                }
                                            />

                                        </div>

                                        <div className="form-field">

                                            <label htmlFor="experience">
                                                Experience Level
                                            </label>

                                            <select
                                                id="experience"
                                                value={
                                                    careerData.experience
                                                }
                                                onChange={(e) =>
                                                    setCareerData({
                                                        ...careerData,
                                                        experience:
                                                            e.target.value
                                                    })
                                                }
                                            >

                                                <option value="">
                                                    Select level
                                                </option>

                                                <option value="Entry">
                                                    Entry Level
                                                </option>

                                                <option value="Mid">
                                                    Mid Level
                                                </option>

                                                <option value="Senior">
                                                    Senior
                                                </option>

                                                <option value="Lead">
                                                    Lead / Manager
                                                </option>

                                            </select>

                                        </div>

                                        <div className="form-field form-field-full">

                                            <label htmlFor="location">
                                                Preferred Location
                                            </label>

                                            <input
                                                id="location"
                                                type="text"
                                                placeholder="e.g. Remote, New York, Bangalore"
                                                value={
                                                    careerData.location
                                                }
                                                onChange={(e) =>
                                                    setCareerData({
                                                        ...careerData,
                                                        location:
                                                            e.target.value
                                                    })
                                                }
                                            />

                                        </div>

                                    </div>

                                    <div className="setting-card-actions">

                                        <button
                                            type="button"
                                            className="save-btn"
                                            onClick={saveCareer}
                                            disabled={savingCareer}
                                        >
                                            {savingCareer
                                                ? "Saving..."
                                                : "Save Preferences"}
                                        </button>

                                    </div>

                                </section>
                            )}

                            {/* NOTIFICATIONS */}
                            {activeTab === "notifications" && (
                                <section className="setting-card">

                                    <div className="setting-card-head">

                                        <h2>
                                            <FaBell />
                                            Notifications
                                        </h2>

                                        <p>
                                            Choose what updates you
                                            want to receive.
                                        </p>

                                    </div>

                                    <div className="toggle-list">

                                        {[
                                            {
                                                key: "jobMatchAlerts",
                                                label: "Job Match Alerts",
                                                desc: "Get notified when new roles match your profile"
                                            },
                                            {
                                                key: "resumeSuggestions",
                                                label: "Resume Suggestions",
                                                desc: "AI tips to improve your resume score"
                                            },
                                            {
                                                key: "interviewReminder",
                                                label: "Interview Reminders",
                                                desc: "Reminders before scheduled mock interviews"
                                            }
                                        ].map(
                                            ({
                                                key,
                                                label,
                                                desc
                                            }) => (
                                                <div
                                                    className="toggle-row"
                                                    key={key}
                                                >

                                                    <div className="toggle-copy">

                                                        <span className="toggle-label">
                                                            {label}
                                                        </span>

                                                        <span className="toggle-desc">
                                                            {desc}
                                                        </span>

                                                    </div>

                                                    <label className="switch">

                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                settings
                                                                    .notifications?.[
                                                                    key
                                                                ] || false
                                                            }
                                                            onChange={() =>
                                                                toggleNotification(
                                                                    key
                                                                )
                                                            }
                                                        />

                                                        <span className="slider" />

                                                    </label>

                                                </div>
                                            )
                                        )}

                                    </div>

                                </section>
                            )}

                            {/* SECURITY */}
                            {activeTab === "security" && (
                                <section className="setting-card">

                                    <div className="setting-card-head">

                                        <h2>
                                            <FaShieldAlt />
                                            Security
                                        </h2>

                                        <p>
                                            Keep your account safe
                                            and secure.
                                        </p>

                                    </div>

                                    <div className="security-panel">

                                        <div className="security-item">

                                            <div className="security-icon">
                                                <FaLock />
                                            </div>

                                            <div>

                                                <strong>
                                                    Password
                                                </strong>

                                                <p>
                                                    Last changed more
                                                    than 30 days ago
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                className="outline-btn"
                                            >
                                                Change Password
                                            </button>

                                        </div>

                                    </div>

                                </section>
                            )}

                            {/* SUBSCRIPTION */}
                            {activeTab === "subscription" && (
                                <div className="subscription-section">

                                    {/* CURRENT PLAN */}
                                    <section className="setting-card subscription-current">

                                        <div className="setting-card-head">

                                            <h2>
                                                <FaCreditCard />
                                                Your Subscription
                                            </h2>

                                            <p>
                                                Manage your plan,
                                                usage, and billing.
                                            </p>

                                        </div>

                                        <div className="current-plan-banner">

                                            <div className="current-plan-info">

                                                <span className="current-plan-label">
                                                    Current Plan
                                                </span>

                                                <h3>

                                                    {currentPlan === "Premium" && (
                                                        <FaCrown className="plan-crown" />
                                                    )}

                                                    {currentPlan}

                                                </h3>

                                                <span
                                                    className={`plan-status ${
                                                        settings.subscription
                                                            ?.status ||
                                                        "active"
                                                    }`}
                                                >
                                                    {(
                                                        settings.subscription
                                                            ?.status ||
                                                        "active"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        (
                                                            settings
                                                                .subscription
                                                                ?.status ||
                                                            "active"
                                                        ).slice(1)}
                                                </span>

                                            </div>

                                            <div className="current-plan-price">

                                                {currentPlan === "Premium" ? (
                                                    <>
                                                        <span className="price-amount">
                                                            $9.99
                                                        </span>

                                                        <span className="price-period">
                                                            /month
                                                        </span>

                                                        <span className="billing-renewal">
                                                            Renews{" "}
                                                            {getNextBillingDate(
                                                                settings.createdAt
                                                            )}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="price-amount">
                                                            $0
                                                        </span>

                                                        <span className="price-period">
                                                            forever
                                                        </span>
                                                    </>
                                                )}

                                            </div>

                                        </div>

                                        {/* USAGE */}
                                        <div className="usage-grid">

                                            {Object.values(usage).map(
                                                (item) => {

                                                    const percent =
                                                        item.limit
                                                            ? Math.min(
                                                                  100,
                                                                  Math.round(
                                                                      (item.used /
                                                                          item.limit) *
                                                                          100
                                                                  )
                                                              )
                                                            : null;

                                                    return (
                                                        <div
                                                            className="usage-card"
                                                            key={item.label}
                                                        >

                                                            <div className="usage-card-head">

                                                                <span>
                                                                    {item.label}
                                                                </span>

                                                                <strong>
                                                                    {item.limit
                                                                        ? `${item.used} / ${item.limit}`
                                                                        : `${item.used} used`}
                                                                </strong>

                                                            </div>

                                                            {item.limit ? (
                                                                <div className="usage-bar">

                                                                    <div
                                                                        className="usage-bar-fill"
                                                                        style={{
                                                                            width: `${percent}%`
                                                                        }}
                                                                    />

                                                                </div>
                                                            ) : (
                                                                <span className="usage-unlimited">
                                                                    Unlimited
                                                                </span>
                                                            )}

                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>

                                        {/* CANCEL */}
                                        {currentPlan === "Premium" && (
                                            <div className="subscription-actions">

                                                <button
                                                    type="button"
                                                    className="outline-btn danger-outline"
                                                    onClick={
                                                        cancelSubscription
                                                    }
                                                    disabled={
                                                        subscriptionLoading
                                                    }
                                                >
                                                    Cancel Subscription
                                                </button>

                                            </div>
                                        )}

                                    </section>

                                    {/* AVAILABLE PLANS */}
                                    <section className="setting-card">

                                        <div className="setting-card-head">

                                            <h2>
                                                Available Plans
                                            </h2>

                                            <p>
                                                Compare plans and switch
                                                anytime.
                                            </p>

                                        </div>

                                        <div className="plan-cards">

                                            {PLANS.map((plan) => {

                                                const isCurrent =
                                                    currentPlan ===
                                                    plan.id;

                                                return (
                                                    <article
                                                        key={plan.id}
                                                        className={`plan-card ${
                                                            plan.highlight
                                                                ? "plan-card-featured"
                                                                : ""
                                                        } ${
                                                            isCurrent
                                                                ? "plan-card-active"
                                                                : ""
                                                        }`}
                                                    >

                                                        {plan.highlight && (
                                                            <span className="plan-badge">
                                                                Most Popular
                                                            </span>
                                                        )}

                                                        {isCurrent && (
                                                            <span className="plan-badge plan-badge-current">
                                                                Current
                                                            </span>
                                                        )}

                                                        <h3 className="plan-name">
                                                            {plan.name}
                                                        </h3>

                                                        <p className="plan-description">
                                                            {
                                                                plan.description
                                                            }
                                                        </p>

                                                        <div className="plan-pricing">

                                                            <span className="plan-price">
                                                                {plan.price}
                                                            </span>

                                                            <span className="plan-period">
                                                                {plan.period}
                                                            </span>

                                                        </div>

                                                        <ul className="plan-features">

                                                            {plan.features.map(
                                                                (
                                                                    feature
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            feature
                                                                        }
                                                                    >

                                                                        <FaCheck className="feature-check" />

                                                                        {
                                                                            feature
                                                                        }

                                                                    </li>
                                                                )
                                                            )}

                                                        </ul>

                                                        <button
                                                            type="button"
                                                            className={
                                                                isCurrent
                                                                    ? "plan-btn plan-btn-current"
                                                                    : "plan-btn"
                                                            }
                                                            disabled={
                                                                isCurrent ||
                                                                subscriptionLoading
                                                            }
                                                            onClick={() =>
                                                                requestPlanChange(
                                                                    plan.id
                                                                )
                                                            }
                                                        >

                                                            {subscriptionLoading
                                                                ? "Updating..."
                                                                : isCurrent
                                                                    ? "Current Plan"
                                                                    : plan.id ===
                                                                        "Premium"
                                                                        ? "Upgrade to Premium"
                                                                        : "Switch to Free"}

                                                        </button>

                                                    </article>
                                                );
                                            })}

                                        </div>

                                    </section>

                                    {/* BILLING HISTORY */}
                                    {currentPlan === "Premium" &&
                                        billingHistory.length > 0 && (
                                            <section className="setting-card">

                                                <div className="setting-card-head">

                                                    <h2>
                                                        Billing History
                                                    </h2>

                                                    <p>
                                                        Recent payments for
                                                        your Premium
                                                        subscription.
                                                    </p>

                                                </div>

                                                <div className="billing-table-wrap">

                                                    <table className="billing-table">

                                                        <thead>

                                                            <tr>
                                                                <th>
                                                                    Date
                                                                </th>

                                                                <th>
                                                                    Amount
                                                                </th>

                                                                <th>
                                                                    Status
                                                                </th>
                                                            </tr>

                                                        </thead>

                                                        <tbody>

                                                            {billingHistory.map(
                                                                (
                                                                    row
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            row.id
                                                                        }
                                                                    >

                                                                        <td>
                                                                            {
                                                                                row.date
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {
                                                                                row.amount
                                                                            }
                                                                        </td>

                                                                        <td>

                                                                            <span className="billing-status">
                                                                                {
                                                                                    row.status
                                                                                }
                                                                            </span>

                                                                        </td>

                                                                    </tr>
                                                                )
                                                            )}

                                                        </tbody>

                                                    </table>

                                                </div>

                                            </section>
                                        )}

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* PLAN CONFIRMATION MODAL */}
            {pendingPlan && (
                <div
                    className="settings-modal-overlay"
                    onClick={() =>
                        !subscriptionLoading &&
                        setPendingPlan(null)
                    }
                >

                    <div
                        className="settings-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                        role="dialog"
                        aria-modal="true"
                    >

                        <div
                            className={`settings-modal-icon ${
                                pendingPlan === "Free"
                                    ? "warning"
                                    : "premium"
                            }`}
                        >
                            {pendingPlan === "Premium"
                                ? <FaCrown />
                                : <FaCreditCard />}
                        </div>

                        <h3>

                            {pendingPlan === "Premium"
                                ? "Upgrade to Premium?"
                                : "Cancel Premium subscription?"}

                        </h3>

                        <p>

                            {pendingPlan === "Premium"
                                ? "You'll unlock unlimited analyses, interviews, and priority support for $9.99/month."
                                : "You'll lose Premium features at the end of your current billing period and return to the Free plan."}

                        </p>

                        <div className="settings-modal-actions">

                            <button
                                type="button"
                                className="outline-btn"
                                onClick={() =>
                                    setPendingPlan(null)
                                }
                                disabled={
                                    subscriptionLoading
                                }
                            >
                                Keep Current Plan
                            </button>

                            <button
                                type="button"
                                className={`save-btn ${
                                    pendingPlan === "Free"
                                        ? "danger-btn"
                                        : ""
                                }`}
                                onClick={() =>
                                    applyPlanChange(
                                        pendingPlan
                                    )
                                }
                                disabled={
                                    subscriptionLoading
                                }
                            >

                                {subscriptionLoading
                                    ? "Processing..."
                                    : pendingPlan ===
                                        "Premium"
                                        ? "Confirm Upgrade"
                                        : "Confirm Cancellation"}

                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Settings;
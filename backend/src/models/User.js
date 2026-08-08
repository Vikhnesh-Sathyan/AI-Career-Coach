import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        // Role
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        // Profile Settings
        profileImage: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        // Career Preferences
        careerPreferences: {
            targetRole: {
                type: String,
                default: "",
            },

            experience: {
                type: String,
                default: "Fresher",
            },

            location: {
                type: String,
                default: "Remote",
            },
        },

        // Notification Settings
        notifications: {
            jobMatchAlerts: {
                type: Boolean,
                default: true,
            },

            resumeSuggestions: {
                type: Boolean,
                default: true,
            },

            interviewReminder: {
                type: Boolean,
                default: false,
            },
        },

        // Subscription
        subscription: {
            plan: {
                type: String,
                default: "Free",
            },

            status: {
                type: String,
                default: "active",
            },
        },
    },

    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
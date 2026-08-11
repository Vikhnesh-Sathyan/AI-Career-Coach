import { useEffect, useState } from "react";

import {
    Check,
    X,
    MessageSquare
} from "lucide-react";

import toast from "react-hot-toast";

import {
    getSupportRequests,
    updateSupportRequest
} from "../services/adminService.js";

import "../styles/adminsupport.css";


function AdminSupport() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [responseMessage, setResponseMessage] =
        useState("");

    const [selectedRequest, setSelectedRequest] =
        useState(null);


    // ==========================================
    // LOAD REQUESTS
    // ==========================================

    useEffect(() => {

        const loadRequests = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await getSupportRequests(token);

                if (response.success) {

                    setRequests(
                        response.data || []
                    );

                } else {

                    toast.error(
                        response.message ||
                        "Unable to load requests"
                    );

                }

            } catch (error) {

                console.error(error);

                toast.error(
                    "Unable to load support requests"
                );

            } finally {

                setLoading(false);

            }

        };

        loadRequests();

    }, []);


    // ==========================================
    // UPDATE REQUEST
    // ==========================================

    const handleRequest = async (
        id,
        status
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await updateSupportRequest(
                    token,
                    id,
                    status,
                    responseMessage
                );


            if (!response.success) {

                toast.error(
                    response.message ||
                    "Unable to update request"
                );

                return;
            }


            // Update UI

            setRequests(
                current =>
                    current.map(request =>
                        request._id === id
                            ? {
                                ...request,
                                status,
                                adminResponse:
                                    responseMessage
                            }
                            : request
                    )
            );


            setSelectedRequest(null);
            setResponseMessage("");


            toast.success(
                status === "approved"
                    ? "Request approved"
                    : "Request rejected"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to update request"
            );

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="admin-support-page">
                <div className="admin-support-empty">
                    Loading requests...
                </div>
            </div>
        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="admin-support-page">

            <div className="admin-support-header">

                <div>

                    <h1>
                        Support Requests
                    </h1>

                    <p>
                        Review account suspension requests.
                    </p>

                </div>

            </div>


            <div className="admin-support-card">

                {requests.length === 0 ? (

                    <div className="admin-support-empty">

                        <MessageSquare size={35} />

                        <p>
                            No support requests yet.
                        </p>

                    </div>

                ) : (

                    requests.map(request => (

                        <div
                            className="support-request"
                            key={request._id}
                        >

                            <div className="support-request-top">

                                <div>

                                    <h3>
                                        {request.user?.name ||
                                            "Unknown User"}
                                    </h3>

                                    <span>
                                        {request.user?.email}
                                    </span>

                                </div>


                                <span
                                    className={
                                        `support-status ${request.status}`
                                    }
                                >
                                    {request.status}
                                </span>

                            </div>


                            <div className="support-message">

                                <strong>
                                    User Message
                                </strong>

                                <p>
                                    {request.message}
                                </p>

                            </div>


                            {request.adminResponse && (

                                <div className="support-admin-response">

                                    <strong>
                                        Admin Response
                                    </strong>

                                    <p>
                                        {request.adminResponse}
                                    </p>

                                </div>

                            )}


                            {request.status === "pending" && (

                                <div className="support-actions">

                                    <button
                                        className="approve-btn"
                                        onClick={() => {
                                            setSelectedRequest(
                                                request
                                            );
                                        }}
                                    >
                                        <Check size={16} />

                                        Approve
                                    </button>


                                    <button
                                        className="reject-btn"
                                        onClick={() => {
                                            setSelectedRequest(
                                                request
                                            );
                                        }}
                                    >
                                        <X size={16} />

                                        Reject
                                    </button>

                                </div>

                            )}

                        </div>

                    ))

                )}

            </div>


            {/* ==================================
                RESPONSE BOX
            ================================== */}

            {selectedRequest && (

                <div className="support-modal">

                    <div className="support-modal-card">

                        <h2>
                            Review Request
                        </h2>

                        <p>
                            Add a response for the user.
                        </p>


                        <textarea
                            placeholder="Enter response..."
                            value={responseMessage}
                            onChange={(e) =>
                                setResponseMessage(
                                    e.target.value
                                )
                            }
                        />


                        <div className="support-modal-actions">

                            <button
                                onClick={() => {

                                    setSelectedRequest(null);
                                    setResponseMessage("");

                                }}
                            >
                                Cancel
                            </button>


                            <button
                                className="approve-btn"
                                onClick={() =>
                                    handleRequest(
                                        selectedRequest._id,
                                        "approved"
                                    )
                                }
                            >
                                Approve
                            </button>


                            <button
                                className="reject-btn"
                                onClick={() =>
                                    handleRequest(
                                        selectedRequest._id,
                                        "rejected"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}


export default AdminSupport;
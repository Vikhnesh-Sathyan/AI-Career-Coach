import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import JobMatcher from "./pages/JobMatcher";
import MatchHistory from "./pages/MatchHistory";
import ATS from "./pages/ATS";
import Settings from "./pages/Settings";
import Interviews from "./pages/Interviews";
import InterviewHistory from "./pages/InterviewHistory";
import Help from "./pages/Help";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminSupport from "./pages/AdminSupport";
import AdminJobs from "./pages/AdminJobs";


import AdminProtectedRoute
    from "./components/admin/AdminProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================== */}

                {/* Default URL */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    USER ROUTES
                ========================== */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/resume"
                    element={<Resume />}
                />

                <Route
                    path="/job-matcher"
                    element={<JobMatcher />}
                />

                <Route
                    path="/match-history"
                    element={<MatchHistory />}
                />

                <Route
                    path="/ats"
                    element={<ATS />}
                />

                <Route
                    path="/interviews"
                    element={<Interviews />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="/interview-history"
                    element={<InterviewHistory />}
                />
                
                 <Route
                    path="/jobs"
                    element={<Jobs />}
                />

                 <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />            

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />
                <Route
                    path="/help"
                    element={<Help />}
                />
                <Route
                    path="/applications"
                    element={<Applications />}
                />

                {/* =========================
                    ADMIN ROUTES
                ========================== */}

                {/* Admin Dashboard */}

                <Route
                    path="/admin"
                    element={
                        <AdminProtectedRoute>

                            <AdminDashboard />

                        </AdminProtectedRoute>
                    }
                />


                {/* Admin User Management */}

                <Route
                    path="/admin/users"
                    element={
                        <AdminProtectedRoute>

                            <AdminUsers />

                        </AdminProtectedRoute>
                    }
                />
                {/* Admin Support Requests */}

                <Route
                    path="/admin/support"
                    element={
                     <AdminProtectedRoute>
                        
                             <AdminSupport />
                    
                     </AdminProtectedRoute>
                    }
                />

                    <Route
                     path="/admin/jobs"
                     element={
                        <AdminProtectedRoute>

                         <AdminJobs />

                        </AdminProtectedRoute>
                    }
                />

                {/* =========================
                    FALLBACK
                ========================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;
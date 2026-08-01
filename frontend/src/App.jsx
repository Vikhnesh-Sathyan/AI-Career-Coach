import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import JobMatcher from "./pages/JobMatcher";
import MatchHistory from "./pages/MatchHistory";
import ATS from "./pages/ATS";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/resume" element={<Resume />} />

                <Route path="/job-matcher" element={<JobMatcher />} />

                <Route path="/match-history" element={<MatchHistory />} />

                <Route path="/ats" element={<ATS />} />

                <Route path="/settings" element={<Settings />} />
                

            </Routes>
        </BrowserRouter>
    );
}

export default App;
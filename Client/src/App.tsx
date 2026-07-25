import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Changelog from "./pages/Changelog";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Cookies from "./pages/Cookies";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AIcomposer from "./pages/AIcomposer";
import Scheduler from "./pages/Scheduler";
import CustomCursor from "./components/CustomCursor";
import CoolLoadingSpinner from "./components/CoolLoadingSpinner";
import { useAuth } from "./context/authContext";

function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <CoolLoadingSpinner fullScreen text="Restoring your session..." />;
    }

    return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <>
            <CustomCursor />
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1a1a1e',
                        color: '#f4f4f5',
                        border: '1px solid #2c2c33',
                        fontSize: '13px',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#ff6b00',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/security" element={<Security />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/accounts" element={<Account />} />
                    <Route path="/AIcomposer" element={<AIcomposer />} />
                    <Route path="/ai-composer" element={<AIcomposer />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                    <Route path="/schedule" element={<Scheduler />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

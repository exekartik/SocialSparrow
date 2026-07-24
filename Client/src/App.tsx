import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AIcomposer from "./pages/AIcomposer";
import Scheduler from "./pages/Scheduler";
import CustomCursor from "./components/CustomCursor";

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
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/accounts" element={<Account />} />
                    <Route path="/AIcomposer" element={<AIcomposer />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                </Route>
            </Routes>
        </>
    );
}

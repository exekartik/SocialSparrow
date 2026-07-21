import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import AIcomposer from "./pages/AIcomposer";
import Scheduler from "./pages/Scheduler";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}  >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/accounts" element={<Account />} />
                    <Route path="/AIcomposer" element={<AIcomposer />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                </Route>
            </Routes>
        </>
    );
}

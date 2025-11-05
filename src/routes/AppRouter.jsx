import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import UserList from "../components/UserList";
import MaquinasList from '../components/MaquinasList'

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
    return (
        <Routes>
            {}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            { }
            <Route
                path="/maquinas"
                element={
                    <PrivateRoute>
                        <MaquinasList />
                    </PrivateRoute>
                }
            />

            <Route
                path="/usuarios"
                element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            { }
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
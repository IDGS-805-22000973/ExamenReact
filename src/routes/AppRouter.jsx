import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../components/Login";
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
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/maquinas" element={<MaquinasList />} />
            <Route path="/usuarios" element={<UserList />} />


            {/* Corrección: PrivateRoute debe envolver el elemento, no ser un Route */}
            <Route
                path="/maquinas/nueva"
                element={
                    <PrivateRoute>
                        <MaquinasList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/usuarios/nuevo"
                element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/maquinas/:id"
                element={
                    <PrivateRoute>
                        <MaquinasList />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
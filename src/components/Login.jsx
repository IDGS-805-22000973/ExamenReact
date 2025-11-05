import React, { useState, useContext } from "react";
import Maquina from "../components/Maquina";
import { useNavigate } from "react-router-dom";
import api from "../helpers/axiosConfig";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/Account/login", form);
            if (res.data.isSuccess) {
                login(res.data.token);
                navigate("/usuarios");
            } else {
                setError(res.data.message || "Credenciales inválidas");
            }
        } catch (err) {
            console.error(err);
            setError("Error al iniciar sesión. Verifica tus datos.");
        }
    };

    return (
        <div className="container-fluid vh-100 bg-light">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            {/* Logo centrado */}
                            <div className="text-center mb-4">
                                <img
                                    src="https://mexicoindustry.com/admin/images/empresas/empresas_logos/universidad-tecnologica-de-leon-utl.jpg"
                                    alt="Logo empresa"
                                    className="img-fluid rounded"
                                    style={{ maxWidth: "120px" }}
                                />
                            </div>

                            <h4 className="card-title text-center mb-4">Iniciar sesión</h4>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show py-2" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleUsersClick = () => {
        navigate('/usuarios');
    };

    const handleMachinesClick = () => {
        navigate('/maquinas');
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4 text-primary">Sistema de Gestión</h1>
                <p className="lead">Selecciona una opción</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm border-0 text-center">
                        <div className="card-body">
                            <i className="bi bi-people display-1 text-primary mb-3"></i>
                            <h5 className="card-title">Gestión de Usuarios</h5>
                            <p className="card-text">Administra los usuarios del sistema</p>
                            <button
                                type="button"
                                className="btn btn-primary btn-lg"
                                onClick={handleUsersClick}
                            >
                                <i className="bi bi-people me-2"></i>
                                Usuarios
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm border-0 text-center">
                        <div className="card-body">
                            <i className="bi bi-cpu display-1 text-success mb-3"></i>
                            <h5 className="card-title">Gestión de Máquinas</h5>
                            <p className="card-text">Administra el inventario de máquinas</p>
                            <button
                                type="button"
                                className="btn btn-success btn-lg"
                                onClick={handleMachinesClick}
                            >
                                <i className="bi bi-cpu me-2"></i>
                                Máquinas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
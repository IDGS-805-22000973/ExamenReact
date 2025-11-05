import React, { useEffect, useState } from "react";
import {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
} from "../services/userService";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        userName: "",
        email: "",
        fullName: "",
        id: null
    });
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (!form.userName.trim()) {
            newErrors.userName = "El nombre de usuario es obligatorio.";
        } else if (form.userName.length < 3) {
            newErrors.userName = "El nombre de usuario debe tener al menos 3 caracteres.";
        } else if (!nameRegex.test(form.userName)) {
            newErrors.userName = "El nombre de usuario solo puede contener letras y espacios.";
        }

        // Validar nombre completo
        if (!form.fullName.trim()) {
            newErrors.fullName = "El nombre completo es obligatorio.";
        } else if (form.fullName.length < 3) {
            newErrors.fullName = "El nombre completo debe tener al menos 3 caracteres.";
        } else if (!nameRegex.test(form.fullName)) {
            newErrors.fullName = "El nombre completo solo puede contener letras y espacios.";
        }

        // Validar correo electrónico
        if (!form.email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email)) {
                newErrors.email = "El formato del correo electrónico no es válido.";
            }
        }

        return newErrors;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({}); // limpia errores

        try {
            if (editingId) {
                await updateUser(editingId, {
                    id: editingId,
                    userName: form.userName,
                    email: form.email,
                    fullName: form.fullName
                });
                setEditingId(null);
            } else {
                await createUser({
                    userName: form.userName,
                    email: form.email,
                    fullName: form.fullName
                });
            }

            resetForm();
            await fetchUsers();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    const resetForm = () => {
        setForm({
            userName: "",
            email: "",
            fullName: "",
            id: null
        });
        setErrors({});
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setForm({
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
            id: user.id
        });
        setErrors({});
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );
        if (!confirmDelete) return;

        try {
            await deleteUser(id);
            await fetchUsers();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        resetForm();
    };

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-xxl-10 col-xl-11 col-lg-12">

                    {/* Header */}
                    <div className="text-center mb-5">
                        <h1 className="fw-bold text-dark">Sistema de Gestión de Usuarios</h1>
                        <p className="text-muted">Administre y mantenga los registros de usuarios de manera eficiente</p>
                    </div>

                    {/* Form Card */}
                    <div className="card shadow-sm border-0 rounded-3 mb-5">
                        <div className="card-header bg-light text-center border-bottom">
                            <h5 className="m-0 fw-semibold text-secondary">
                                <i className="bi bi-person-plus me-2"></i>
                                {editingId ? "Editar Usuario" : "Registrar Nuevo Usuario"}
                            </h5>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit} className="row g-4">

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold text-secondary">
                                        <i className="bi bi-person me-1"></i> Usuario *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese nombre de usuario"
                                        value={form.userName}
                                        onChange={(e) => setForm({ ...form, userName: e.target.value })}
                                    />
                                    {errors.userName && (
                                        <div className="text-danger small mt-1">{errors.userName}</div>
                                    )}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold text-secondary">
                                        <i className="bi bi-envelope me-1"></i> Email *
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="correo@ejemplo.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                    {errors.email && (
                                        <div className="text-danger small mt-1">{errors.email}</div>
                                    )}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold text-secondary">
                                        <i className="bi bi-card-text me-1"></i> Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre completo"
                                        value={form.fullName}
                                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    />
                                    {errors.fullName && (
                                        <div className="text-danger small mt-1">{errors.fullName}</div>
                                    )}
                                </div>

                                <div className="col-12 text-center pt-3">
                                    <button
                                        type="submit"
                                        className={`btn btn-primary btn-lg fw-semibold px-4 me-3`}
                                    >
                                        <i className={`bi ${editingId ? 'bi-arrow-clockwise' : 'bi-person-plus'} me-2`}></i>
                                        {editingId ? "Actualizar Usuario" : "Agregar Usuario"}
                                    </button>

                                    {editingId && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg px-4"
                                            onClick={cancelEdit}
                                        >
                                            <i className="bi bi-x-circle me-2"></i>
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Users Table Card */}
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-light text-center border-bottom">
                            <h5 className="m-0 fw-semibold text-secondary">
                                <i className="bi bi-people me-2"></i> Lista de Usuarios Registrados
                            </h5>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr className="text-center">
                                            <th>ID</th>
                                            <th>Usuario</th>
                                            <th>Email</th>
                                            <th>Nombre Completo</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((u) => (
                                                <tr key={u.id} className="text-center">
                                                    <td>#{u.id}</td>
                                                    <td>{u.userName}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.fullName}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => handleEdit(u)}
                                                            >
                                                                <i className="bi bi-pencil me-1"></i> Editar
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDelete(u.id)}
                                                            >
                                                                <i className="bi bi-trash me-1"></i> Eliminar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 text-muted">
                                                    <i className="bi bi-people display-6 d-block mb-2"></i>
                                                    No hay usuarios registrados
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {users.length > 0 && (
                            <div className="card-footer text-center bg-light">
                                <small className="text-muted">
                                    Total de {users.length} usuario{users.length !== 1 ? 's' : ''} registrado
                                    {users.length !== 1 ? 's' : ''}
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default UserList;

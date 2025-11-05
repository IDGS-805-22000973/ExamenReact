import axios from "axios";

const API_URL = "http://localhost:5005/api/Users";

// Obtener todos los usuarios
export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log("Error al obtener usuarios:", error);
        throw error;
    }
}

// Crear usuarios
export const createUser = async (user) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.log("Error al crear usuario:", error);
        throw error;
    }
}

// Actualizar usuarios
export const updateUser = async (id, user) => { 
    try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.log("Error al actualizar usuario:", error);
        throw error;
    }
}

// Eliminar usuario
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error al eliminar usuario:", error);
        throw error;
    }
}
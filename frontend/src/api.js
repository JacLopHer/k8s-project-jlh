// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/items'; // Endpoint base para el CRUD de ítems

// Crear un nuevo ítem (POST)
export const createItem = async (newItem) => {
  try {
    const response = await axios.post(API_URL, newItem);
    return response.data;
  } catch (error) {
    console.error('Error al crear el item:', error);
    throw error;
  }
};

// Obtener todos los ítems (GET)
export const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los items:', error);
    throw error;
  }
};

// Eliminar un ítem por ID (DELETE)
export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return 'Item eliminado correctamente';
  } catch (error) {
    console.error('Error al eliminar el item:', error);
    throw error;
  }
};

// Actualizar un ítem por ID (PUT)
export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el item:', error);
    throw error;
  }
};

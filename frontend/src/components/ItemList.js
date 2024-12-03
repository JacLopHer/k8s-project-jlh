// ItemList.js
import React, { useEffect, useState } from 'react';
import { getItems, deleteItem, updateItem } from '../api';

const ItemList = ({ onItemDeleted, onItemUpdated }) => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const fetchItems = async () => {
    try {
      const allItems = await getItems();
      setItems(allItems);
    } catch (error) {
      console.error('Error al obtener los ítems:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      console.log('Item eliminado');
      onItemDeleted(); // Notificamos al componente principal para refrescar la lista
      fetchItems(); // Recargamos la lista después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el item:', error);
    }
  };

  const handleUpdate = (item) => {
    setEditingItem(item.id); // Iniciamos el modo de edición
    setUpdatedName(item.name); // Establecemos el nombre actual del ítem en el input
  };

  const handleSaveUpdate = async (id) => {
    try {
      const updatedItem = { name: updatedName };
      await updateItem(id, updatedItem);
      console.log('Item actualizado');
      onItemUpdated(); // Refresca la lista después de actualizar
      fetchItems(); // Recargamos la lista después de la actualización
      setEditingItem(null); // Salimos del modo de edición
    } catch (error) {
      console.error('Error al actualizar el item:', error);
    }
  };

  // Este efecto se ejecuta al montar el componente o cuando el estado cambia
  useEffect(() => {
    fetchItems();
  }, []); // Solo se ejecuta cuando el componente se monta por primera vez

  return (
    <div>
      <h3>Lista de Items</h3>
      <ul>
        {items.length === 0 ? (
          <li>No hay ítems disponibles.</li>
        ) : (
          items.map(item => (
            <li key={item.id}>
              {editingItem === item.id ? (
                <>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    required
                  />
                  <button onClick={() => handleSaveUpdate(item.id)}>Guardar</button>
                </>
              ) : (
                <>
                  {item.name}
                  <button onClick={() => handleUpdate(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;

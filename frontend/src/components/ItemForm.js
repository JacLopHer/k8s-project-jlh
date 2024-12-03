// ItemForm.js
import React, { useState } from 'react';
import { createItem } from '../api';

const ItemForm = ({ onItemCreated }) => {
  const [newItem, setNewItem] = useState({ name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdItem = await createItem(newItem);
      console.log('Item creado:', createdItem);
      onItemCreated();
      setNewItem({ name: '' });
    } catch (error) {
      console.error('Error al crear el item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Nuevo Item</h3>
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Nombre del item"
        required
      />
      <button type="submit">Crear Item</button>
    </form>
  );
};

export default ItemForm;

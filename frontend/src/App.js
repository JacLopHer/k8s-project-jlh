import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '' });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Obtener los items cuando el componente se monta
    fetch('http://localhost:8080/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleInputChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Si hay un item siendo editado, realizamos un PUT
    if (editingItem) {
      fetch(`http://localhost:8080/api/items/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
        .then(response => response.json())
        .then(data => {
          setItems(items.map(item => (item.id === data.id ? data : item)));
          setNewItem({ name: '' });
          setEditingItem(null);
        })
        .catch(error => console.error('Error updating item:', error));
    } else {
      // Si no hay edición, realizamos un POST
      fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
        .then(response => response.json())
        .then(data => {
          setItems([...items, data]);
          setNewItem({ name: '' });
        })
        .catch(error => console.error('Error adding item:', error));
    }
  };

  const handleEdit = (item) => {
    setNewItem({ name: item.name });
    setEditingItem(item);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <h1>CRUD Básico de Items</h1>

      {/* Formulario para agregar o editar un Item */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Nombre del item"
          required
        />
        <button type="submit">{editingItem ? 'Actualizar' : 'Agregar'} Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

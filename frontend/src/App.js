import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    const fetchItems = async () => {
        const result = await axios.get("http://localhost:8080/api/read");
        setItems(result.data);
    };

    const createItem = async () => {
        await axios.post("http://localhost:8080/api/create", newItem);
        fetchItems();
    };

    const updateItem = async (index, updatedItem) => {
        await axios.put(`http://localhost:8080/api/update/${index}`, updatedItem);
        fetchItems();
    };

    const deleteItem = async (index) => {
        await axios.delete(`http://localhost:8080/api/delete/${index}`);
        fetchItems();
    };

    return (
        <div>
            <h1>CRUD Operations</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter new item"
            />
            <button onClick={createItem}>Create</button>
            <button onClick={fetchItems}>Fetch Items</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}{" "}
                        <button onClick={() => updateItem(index, prompt("New value", item))}>
                            Update
                        </button>{" "}
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import AddItem from './Additem'; 

const AdminPanel = () => {
    const [items, setItems] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const addProduct = (newProduct) => {
        setItems((prevItems) => [...prevItems, newProduct]);
    };

    const removeProduct = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Adminpanel</h1>
            {isAdding ? (
                <AddItem onProductAdded={addProduct} onCancel={() => setIsAdding(false)} />
            ) : (
                <button onClick={() => setIsAdding(true)}>Lägg till produkt</button>
            )}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price} kr
                        <button onClick={() => removeProduct(index)}>Ta bort</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;

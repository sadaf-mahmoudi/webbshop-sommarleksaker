import React, { useState } from 'react';
import AddItems from './Additem'; 

const Cart = () => {
    const [items, setItems] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const addProduct = (newProduct) => {
        if (editProduct) {
            setItems((prevItems) => 
                prevItems.map(item => item.name === editProduct.name ? newProduct : item)
            );
            setEditProduct(null);
        } else {
            setItems((prevItems) => [...prevItems, newProduct]);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setIsAdding(true);
    };

    const handleDelete = (productName) => {
        setItems((prevItems) => prevItems.filter(item => item.name !== productName));
    };

    return (
        <div>
            <h1>Kassa</h1>
            {isAdding ? (
                <AddItems 
                    onProductAdded={addProduct} 
                    onCancel={() => { setIsAdding(false); setEditProduct(null); }} 
                    initialData={editProduct}
                />
            ) : (
                <button onClick={() => setIsAdding(true)}>Lägg till produkt</button>
            )}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price} kr
                        <button onClick={() => handleEdit(item)}>Ändra</button>
                        <button onClick={() => handleDelete(item.name)}>Ta bort</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;

import React, { useState } from 'react';
import '../style/Product.css';

const ProductItem = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            onAddToCart(product, quantity);
        }
    };

    return (
        <div className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} kr</p>
            <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
            </div>
            <button onClick={handleAddToCart}>Lägg till i kassan</button>
        </div>
    );
};

export default ProductItem;

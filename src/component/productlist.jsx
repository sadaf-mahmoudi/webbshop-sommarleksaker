import React from 'react';
import ProductItem from './productitem';
import './product.css';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;


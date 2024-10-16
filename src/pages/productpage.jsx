import React, { useEffect, useState } from 'react';
import useCartStore from '../useCartStore';
import SortBy from '../component/SortBy'; 
import './productpage.css'; 

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [error, setError] = useState('');
    const { addToCart } = useCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://firestore.googleapis.com/v1/projects/webbshop-sommarleksaker/databases/(default)/documents/products`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                console.log('Vad finns i datan?', data.documents[0])
                if (data.documents && data.documents.length > 0) {
                    const productsList = data.documents.map(doc => ({
                        id: doc.name.split('/').pop(),
                        name: doc.fields.Name?.stringValue || 'Ingen namn tillgänglig',
                        price: doc.fields.Price?.integerValue || 0, 
                        image: doc.fields.image?.stringValue || ''
                    }));
                    setProducts(productsList);
                    setSortedProducts(productsList); 
                } else {
                    throw new Error("Ingen produktdata hittades.");
                }
            } catch (error) {
                console.error("Det gick inte att hämta produkterna:", error);
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    const handleSort = (sortedList) => {
        setSortedProducts(sortedList); 
    };

    return (
        <div>
            <h1>Produkter</h1>
            {error && <p>{error}</p>}
            <SortBy list={products} setList={handleSort} />
            <div className="product-grid">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map(product => (
                        <div className="product-item" key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>Pris: {product.price} kr</p>
                            <button 
                                className="add-to-cart-button" 
                                onClick={() => addToCart({ ...product, quantity: 1 })} 
                            >
                                +
                            </button>
                        </div>
                    ))
                ) : (
                    <p>.</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;

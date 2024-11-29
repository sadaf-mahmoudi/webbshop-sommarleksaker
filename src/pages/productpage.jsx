import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
// Ändra denna rad:
import { db } from '../component/firebase';  // Uppdaterad sökväg
import useCartStore from '../useCartStore';
import SortBy from '../component/SortBy';
import './productpage.css';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [error, setError] = useState('');
    const { addToCart } = useCartStore();

    useEffect(() => {
        const q = query(collection(db, 'products'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const productsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().Name,
                    price: doc.data().Price,
                    image: doc.data().image
                }));
                setProducts(productsList);
                setSortedProducts(productsList);
            } catch (error) {
                setError('Kunde inte hämta produkter');
                console.error(error);
            }
        });

        return () => unsubscribe();
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
                            <h2>{product.name}</h2>
                            <img 
                                src={product.image} 
                                alt={product.name}
                                onError={(e) => {
                                    console.error('Bildladdningsfel:', product.image);
                                    e.target.src = 'https://via.placeholder.com/200x200?text=Bild+saknas';
                                }}
                            />
                            <p>{product.price} kr</p>
                            <button 
                                className="add-to-cart-button"
                                onClick={() => addToCart({ ...product, quantity: 1 })}
                            >
                                +
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Laddar produkter...</p>
                )}
            </div>
        </div>
    );
};

export default ProductPage;

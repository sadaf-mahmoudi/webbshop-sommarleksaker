import React, { useState, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { collection, query, onSnapshot } from 'firebase/firestore';
// Ändra denna rad:
import { db } from './component/firebase';  // Uppdaterad sökväg
import Root from './component/Root';
import ProductPage from './pages/productpage';
import Home from './pages/Home';
import CheckoutPage from './pages/checkoutpage';
import Footer from './component/footer';
import AdminPanel from './component/AdminPanel';
import './App.css';
import './styles.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

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
            } catch (error) {
                setError('Kunde inte hämta produkter');
                console.error(error);
            }
        });

        return () => unsubscribe();
    }, []);

    const updateProductList = (newProductList) => {
        setProducts(newProductList);
    };

    const router = createHashRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                { path: '/', element: <Home /> },
                { path: 'checkout', element: <CheckoutPage /> },
                { path: 'products', element: <ProductPage products={products} /> },
                { path: 'admin', element: <AdminPanel products={products} updateProductList={updateProductList} /> },
            ],
        },
    ]);

    return (
        <div className="app">
            <main className="content">
                <RouterProvider router={router} />
            </main>
            <Footer />
        </div>
    );
};

export default App;

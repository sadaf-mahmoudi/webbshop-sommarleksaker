import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Root from './component/Root';
import ProductPage from './pages/productpage';
import Home from './pages/Home';
import CheckoutPage from './pages/checkoutpage';
import './styles.css'; 

const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            },
            {
                path: 'products',
                element: <ProductPage />
            },

        ]
    }
]);

const App = () => {
    return (
        <div className="app">
            
            <main className="content">
                <RouterProvider router={router} />
            </main>
            <footer className="footer"></footer> 
        </div>
    );
};

export default App;

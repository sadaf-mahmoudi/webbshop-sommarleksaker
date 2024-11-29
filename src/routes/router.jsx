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
                element: <CheckoutPage />,
            },
            {
                path: 'products',
                element: <ProductPage />,
            },
            {
                path: 'admin',  
                element: <AdminPanel />,
            },
        ],
    },
]);

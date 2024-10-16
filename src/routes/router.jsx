import { createHashRouter } from 'react-router-dom';
import Root from '../style/Root'; 
import CheckoutPage from '../pages/checkoutpage';
import ProductPage from '../pages/productpage';

const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'checkout',
                element: <CheckoutPage />
            },
            {
                path: 'products',
                element: <ProductPage />
            }
        ]
    }
]);

export { router };

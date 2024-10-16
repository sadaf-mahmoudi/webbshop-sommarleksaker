import React, { useState } from 'react';
import useCartStore from '../useCartStore';

const CheckoutPage = () => {
    const { cartItems, removeFromCart } = useCartStore();
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleOrder = () => {
        
        cartItems.forEach(item => removeFromCart(item.id));
        
        
        setOrderConfirmed(true);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Kassa</h1>
            {orderConfirmed ? (
                <h2>Tack för din beställning! Betalning kommer via faktura.</h2>
            ) : (
                <>
                    {cartItems.length === 0 ? (
                        <p>Din kundvagn är tom.</p>
                    ) : (
                        <div>
                            <h2>Dina Varor:</h2>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {cartItems.map(item => (
                                    <li key={item.id} style={{ margin: '10px 0' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                        {item.name} - {item.quantity} x {item.price} kr
                                        <button 
                                            onClick={() => removeFromCart(item.id)} 
                                            className="quantity-button"
                                        >
                                            -
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <h3 style={{ marginTop: '20px' }}>Totalt: {totalAmount} kr</h3>
                            <button 
                                onClick={handleOrder} 
                                className="add-to-cart-button"
                            >
                                Slutför Beställning
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CheckoutPage;

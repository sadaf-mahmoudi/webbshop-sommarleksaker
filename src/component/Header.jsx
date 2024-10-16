import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <h1>Sommarleksaker</h1>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link className="nav-button" to="/">Hem</Link>
                    </li>
                    <li>
                        <Link className="nav-button" to="/products">Produkter</Link>
                    </li>
                    <li>
                        <Link className="nav-button" to="/checkout">Kassa</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

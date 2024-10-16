<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> f91209ffa00e2b3c94baa2e477a70357793fac7e

import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, query, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AdminPanel.css';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [newProduct, setNewProduct] = useState({
        Name: '',
        Price: '',
        image: ''
    });

    const getProxyImageUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/200x200?text=Bild+saknas';
        try {
            if (url.startsWith('data:image') || url.startsWith('https://firebasestorage.googleapis.com')) {
                return url;
            }
            return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
        } catch (error) {
            console.error('URL encoding error:', error);
            return 'https://via.placeholder.com/200x200?text=Bild+saknas';
        }
    };

    useEffect(() => {
        const q = query(collection(db, 'products'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
        });

        return () => unsubscribe();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUpload(file);
            
            setNewProduct(prev => ({ ...prev, image: '' }));
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        
        if (!newProduct.Name.trim() || !newProduct.Price) {
            setError('Fyll i namn och pris');
            return;
        }

        if (!imageUpload && !newProduct.image) {
            setError('Välj en bild eller ange en bild-URL');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            let imageUrl = '';
            
            if (imageUpload) {
                const imageRef = ref(storage, `products/${Date.now()}-${imageUpload.name}`);
                await uploadBytes(imageRef, imageUpload);
                imageUrl = await getDownloadURL(imageRef);
            } else if (newProduct.image) {
                imageUrl = newProduct.image;
            }

            const productData = {
                Name: newProduct.Name.trim(),
                Price: Number(newProduct.Price),
                image: imageUrl,
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, 'products'), productData);

            setNewProduct({
                Name: '',
                Price: '',
                image: ''
            });
            setImageUpload(null);
            setSuccessMessage('Produkt tillagd!');
        } catch (error) {
            console.error('Add error:', error);
            setError('Kunde inte lägga till produkten. Försök igen.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Är du säker på att du vill ta bort denna produkt?')) {
            return;
        }
        
        try {
            await deleteDoc(doc(db, 'products', productId));
            setSuccessMessage('Produkt borttagen!');
        } catch (error) {
            console.error('Delete error:', error);
            setError('Kunde inte ta bort produkten');
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct({
            ...product,
            Name: product.Name || '',
            Price: product.Price || '',
            image: product.image || ''
        });
    };

    const handleUpdate = async (product) => {
        if (!product.Name.trim() || !product.Price) {
            setError('Fyll i både namn och pris');
            return;
        }

        try {
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, {
                Name: product.Name.trim(),
                Price: Number(product.Price),
                image: product.image.trim()
            });
            setEditingProduct(null);
            setSuccessMessage('Produkt uppdaterad!');
        } catch (error) {
            console.error('Update error:', error);
            setError('Kunde inte uppdatera produkten');
        }
    };

    return (
        <div className="admin-panel">
            <h1>AdminPanel</h1>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <div className="add-product-form">
                <form onSubmit={handleAddProduct}>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        placeholder="Produktnamn"
                        value={newProduct.Name}
                        onChange={(e) => setNewProduct({...newProduct, Name: e.target.value})}
                        required
                    />
                    <input
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        placeholder="Pris"
                        value={newProduct.Price}
                        onChange={(e) => setNewProduct({...newProduct, Price: e.target.value})}
                        required
                        min="0"
                    />
                    <input
                        type="url"
                        id="productImage"
                        name="productImage"
                        placeholder="Lägg till bildadress"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'Lägger till...' : 'Lägg till produkt'}
                    </button>
                </form>
            </div>
            
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="image-container">
                            <img 
                                src={getProxyImageUrl(product.image)}
                                alt={product.Name} 
                                className="product-image"
                                onError={(e) => {
                                    console.error('Bildladdningsfel för:', product.image);
                                    e.target.src = 'https://via.placeholder.com/200x200?text=Bild+saknas';
                                }}
                                loading="lazy"
                            />
                        </div>
                        <div className="product-info">
                            {editingProduct?.id === product.id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        id={`edit-name-${product.id}`}
                                        name={`edit-name-${product.id}`}
                                        value={editingProduct.Name || ''}
                                        onChange={(e) => setEditingProduct({
                                            ...editingProduct,
                                            Name: e.target.value
                                        })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        id={`edit-price-${product.id}`}
                                        name={`edit-price-${product.id}`}
                                        value={editingProduct.Price || ''}
                                        onChange={(e) => setEditingProduct({
                                            ...editingProduct,
                                            Price: e.target.value
                                        })}
                                        required
                                        min="0"
                                    />
                                    <input
                                        type="url"
                                        id={`edit-image-${product.id}`}
                                        name={`edit-image-${product.id}`}
                                        value={editingProduct.image || ''}
                                        onChange={(e) => setEditingProduct({
                                            ...editingProduct,
                                            image: e.target.value
                                        })}
                                        placeholder="Bild-URL"
                                        required
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={() => handleUpdate(editingProduct)}>Spara</button>
                                        <button onClick={() => setEditingProduct(null)}>Avbryt</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="product-name">{product.Name}</h3>
                                    <p className="product-price">{product.Price} kr</p>
                                    <div className="button-group">
                                        <button 
                                            onClick={() => handleEditProduct(product)}
                                            className="edit-btn"
                                        >
                                            Redigera
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="delete-btn"
                                        >
                                            Ta bort
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
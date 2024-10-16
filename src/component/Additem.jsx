import { useState, useEffect } from "react";

const AddItems = ({ onProductAdded, onCancel, initialData }) => {
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState("");

    useEffect(() => {
        if (initialData) {
            setItemName(initialData.name);
            setItemPrice(initialData.price);
            setItemImage(initialData.image);
        }
    }, [initialData]);

    const handleAddItemClick = () => {
        const newProduct = {
            name: itemName,
            price: itemPrice,
            image: itemImage || null,
        };

        onProductAdded(newProduct);
        onCancel();
    };

    return (
        <div>
            <h2>{initialData ? "Ändra produkt" : "Lägg till produkt"}</h2>
            <input
                type="text"
                placeholder="Produktnamn"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Pris"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Bildadress (valfritt)"
                value={itemImage}
                onChange={(e) => setItemImage(e.target.value)}
            />
            <button onClick={handleAddItemClick}>
                {initialData ? "Spara ändringar" : "Lägg till"}
            </button>
            <button onClick={onCancel}>Avbryt</button>
        </div>
    );
};

export default AddItems;

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";  // Uppdaterad sökväg

const updatedProduct = async (collectionName, itemId, newData) => {
    try {
        const itemRef = doc(db, collectionName, itemId);
        await updateDoc(itemRef, newData);
        console.log("Item successfully updated!");
        return true;
    } catch (error) {
        console.error("Error updating product:", error);
        return false;
    }
};

export { updatedProduct };
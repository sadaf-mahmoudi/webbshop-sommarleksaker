import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./fire.js";

const deleteProduct = async (itemId) => {
  try {
      await deleteDoc(doc(db, "Products", itemId));
  } catch (error) {
      console.error("Error deleting product:", error);
  }
};

const addProduct = async ({ name, price, type, image }) => {
  try {
      await addDoc(collection(db, "Products"), {
          name,
          price,
          type,
          image,
      });

      const accessoriesCollection = collection(db, "Products");
      const accessoriesSnapshot = await getDocs(accessoriesCollection);
      const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
      return accessoriesList;
  } catch (error) {
      console.error("Error adding product:", error);
  }
};

const updatedProduct = async (collectionName, itemId, newData) => {
  try {
      const itemRef = doc(db, collectionName, itemId);
      await updateDoc(itemRef, newData);
      console.log(`Item successfully updated in ${collectionName}`);
      return true;
  } catch (error) {
      console.error("Error updating product:", error);
  }
};

export { deleteProduct, addProduct, updatedProduct };

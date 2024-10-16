import { create } from "zustand";
import { persist } from "zustand/middleware";

const storage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : undefined; // Deserialisera
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value)); // Serialisera
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            // Öka kvantiteten om produkten redan finns
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            // Lägg till ny produkt med kvantitet 1 om den inte finns
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        });
      },
      updateQuantity: (id, change) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + change }
                : item
            )
            .filter((item) => item.quantity > 0), // Ta bort produkten om kvantiteten är noll
        }));
      },
      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // Namn på lagringsobjektet under vilket tillståndet ska sparas
      storage: storage, // Använder anpassad lagringskonfiguration
    }
  )
);

export default useCartStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const storage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : undefined; 
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value)); 
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
            
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            
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
            .filter((item) => item.quantity > 0), 
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
      name: "cart-storage", 
      storage: storage, 
    }
  )
);

export default useCartStore;

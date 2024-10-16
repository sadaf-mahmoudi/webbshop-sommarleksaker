import create from 'zustand';

export const useStore = create(set => ({
    checkoutList: [],
    addToCheckout: (product) => set(state => ({
        checkoutList: [...state.checkoutList, product]
    })),
    deleteFromCheckout: (id) => set(state => ({
        checkoutList: state.checkoutList.filter(item => item.id !== id)
    })),
    checkoutTotal: () => set(state => (
        state.checkoutList.reduce((total, item) => total + item.price, 0)
    )),
}));

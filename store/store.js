import create from "zustand"

export const useStore = create((set) => ({
  cart: {
    pizzas: [],
  },
  AutoCompletestring: {
    text: "",
  },

  // adding to cart
  addPizza: (data) =>
    set((state) => ({
      cart: {
        pizzas: [...state.cart.pizzas, data],
      },
    })),
  //removing from cart
  removePizza: (index) =>
    set((state) => ({
      cart: {
        pizzas: state.cart.pizzas.filter((pizza, i) => i !== index),
      },
    })),
  //clereaing cart
  clearingCart: (index) =>
    set((state) => ({
      cart: {
        pizzas: [],
      },
    })),

  //AutoComplete string
  autoComplete: (data) =>
    set((state) => ({
      AutoCompletestring: {
        text: data,
      },
    })),
}))

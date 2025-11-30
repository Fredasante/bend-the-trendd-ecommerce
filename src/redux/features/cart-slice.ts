import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 🛍️ Cart Item Type
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  stockQuantity: number;
  mainImageUrl?: string;
  size?: string;
  color?: string;
};

// 🧺 State Type
type InitialState = {
  items: CartItem[];
};

// 🧩 Initial State
const initialState: InitialState = {
  items: [],
};

// 🛠️ Slice
export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const {
        _id,
        name,
        price,
        quantity,
        discountPrice,
        mainImageUrl,
        size,
        color,
        stockQuantity,
      } = action.payload;

      const existingItem = state.items.find((item) => item._id === _id);

      // 🛑 If item already exists, increase quantity (up to stock limit)
      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          stockQuantity
        );
        existingItem.quantity = newQuantity;
        return;
      }

      // ✅ Otherwise, add new item (ensure quantity doesn't exceed stock)
      state.items.push({
        _id,
        name,
        price,
        quantity: Math.min(quantity, stockQuantity),
        discountPrice,
        mainImageUrl,
        size,
        color,
        stockQuantity,
      });
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        // ✅ Ensure quantity doesn't exceed available stock
        existingItem.quantity = Math.min(
          Math.max(action.payload.quantity, 1), // Minimum 1
          existingItem.stockQuantity // Maximum stock
        );
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

// 🧮 Selectors
export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    const priceToUse = item.discountPrice ?? item.price;
    return total + priceToUse * item.quantity;
  }, 0)
);

export const selectTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;

export default cart.reducer;

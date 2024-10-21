import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categories: [],
	products: [],
};

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { setCategories, setProducts } = shopSlice.actions;

export default shopSlice.reducer;

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

console.log(import.meta.env.VITE_API_URL);

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Product", "Order", "User", "Category"],
	endpoints: () => ({}),
});

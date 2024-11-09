import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
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

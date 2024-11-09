// apiSlice.js
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	tagTypes: ["Product", "Order", "User", "Category"],
	endpoints: () => ({}),
});

const withAuthHeaders = (endpoints) => {
	const endpointsObject = endpoints();
	Object.keys(endpointsObject).forEach((key) => {
		endpointsObject[key] = {
			...endpointsObject[key],
			prepareHeaders: (headers, { getState }) => {
				const token = getState().auth.token;
				if (token) {
					headers.Authorization = `Bearer ${token}`;
				}
				return headers;
			},
		};
	});
	return endpointsObject;
};

export const injectEndpoints = (endpoints) => {
	return apiSlice.injectEndpoints({
		endpoints: withAuthHeaders(endpoints),
	});
};

export { apiSlice };

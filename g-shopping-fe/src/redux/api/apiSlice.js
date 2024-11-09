import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	headers: { Authorization: `Bearer ${token}` },
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Product", "Order", "User", "Category"],
	endpoints: () => ({}),
});

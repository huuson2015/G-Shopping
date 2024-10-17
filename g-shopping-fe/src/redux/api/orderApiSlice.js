import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: `${ORDER_URL}`,
				method: "POST",
				body: order,
			}),
		}),
		getOrders: builder.query({
			query: () => ({
				url: `${ORDER_URL}`,
				method: "GET",
			}),
		}),
		getOrderDetails: builder.query({
			query: (orderId) => ({
				url: `${ORDER_URL}/${orderId}`,
				method: "GET",
			}),
		}),
		paidOrder: builder.mutation({
			query: (orderId, details) => ({
				url: `${PAYPAL_URL}/${orderId}/paid`,
				method: "GET",
				body: details,
			}),
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDER_URL}/${orderId}/delivered`,
				method: "PUT",
			}),
		}),
		getPaypalCliendId: builder.query({
			query: () => ({
				url: `${PAYPAL_URL}`,
				method: "GET",
			}),
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDER_URL}/mine-orders`,
				method: "GET",
			}),
			keepUnusedDataFor: 5,
		}),
		getTotalOrders: builder.query({
			query: () => `${ORDER_URL}/total-orders`,
		}),
		getTotalSales: builder.query({
			query: () => `${ORDER_URL}/total-sales`,
		}),
		getTotalSalesByDate: builder.query({
			query: () => `${ORDER_URL}/total-sales-by-date`,
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrdersQuery,
	useGetOrderDetailsQuery,
	usePaidOrderMutation,
	useDeliverOrderMutation,
	useGetPaypalCliendIdQuery,
	useGetMyOrdersQuery,
	useGetTotalOrdersQuery,
	useGetTotalSalesQuery,
	useGetTotalSalesByDateQuery,
} = orderApiSlice;
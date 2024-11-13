import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ keyword }) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}`,
				params: { keyword },
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Products"],
		}),

		getProductById: builder.query({
			query: (productId) => `${import.meta.env.VITE_PRODUCT_URL}/${productId}`,
			providesTags: (result, error, productId) => [
				{ type: "Product", id: productId },
			],
		}),

		allProducts: builder.query({
			query: () => `${import.meta.env.VITE_PRODUCT_URL}/allProducts`,
		}),

		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),

		createProduct: builder.mutation({
			query: (productData) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}`,
				method: "POST",
				body: productData,
			}),
			invalidatesTags: ["Product"],
		}),

		updateProduct: builder.mutation({
			query: ({ productId, formData }) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}/${productId}`,
				method: "PUT",
				body: formData,
			}),
		}),

		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `${import.meta.env.VITE_UPLOAD_URL}`,
				method: "POST",
				body: data,
			}),
		}),

		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}/${productId}`,
				method: "DELETE",
			}),
			providesTags: ["Product"],
		}),

		createReview: builder.mutation({
			query: (data) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}/${data.productId}/reviews`,
				method: "POST",
				body: data,
			}),
		}),

		getTopProducts: builder.query({
			query: () => `${import.meta.env.VITE_PRODUCT_URL}/top`,
			keepUnusedDataFor: 5,
		}),

		getNewProducts: builder.query({
			query: () => `${import.meta.env.VITE_PRODUCT_URL}/new`,
			keepUnusedDataFor: 5,
		}),

		getRelatedProducts: builder.query({
			query: (productId) => ({
				url: `${
					import.meta.env.VITE_PRODUCT_URL
				}/${productId}/related-products`,
				method: "GET",
			}),
		}),

		getFilteredProducts: builder.query({
			query: (searchParams) => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}/filtered-products`,
				method: "GET",
				params: searchParams,
			}),
		}),
		getProductBrands: builder.query({
			query: () => ({
				url: `${import.meta.env.VITE_PRODUCT_URL}/brands`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useAllProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useCreateReviewMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useGetTopProductsQuery,
	useGetNewProductsQuery,
	useGetRelatedProductsQuery,
	useGetFilteredProductsQuery,
	useGetProductBrandsQuery,
} = productApiSlice;

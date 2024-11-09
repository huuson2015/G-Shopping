import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createCategory: builder.mutation({
			query: (newCategory) => ({
				url: `${import.meta.env.VITE_CATEGORY_URL}`,
				method: "POST",
				body: newCategory,
			}),
		}),

		updateCategory: builder.mutation({
			query: ({ categoryId, updatedCategory }) => ({
				url: `${import.meta.env.VITE_CATEGORY_URL}/${categoryId}`,
				method: "PUT",
				body: updatedCategory,
			}),
		}),

		deleteCategory: builder.mutation({
			query: (categoryId) => ({
				url: `${import.meta.env.VITE_CATEGORY_URL}/${categoryId}`,
				method: "DELETE",
			}),
		}),

		fetchCategories: builder.query({
			query: () => `${import.meta.env.VITE_CATEGORY_URL}/categories`,
		}),
	}),
});

export const {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useFetchCategoriesQuery,
} = categoryApiSlice;

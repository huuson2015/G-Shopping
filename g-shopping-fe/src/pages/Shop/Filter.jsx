import { PropTypes } from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "@redux/api/categoryApiSlice";

import { setCategories } from "@redux/features/shop/shopSlice";
import { useEffect } from "react";
import { useGetProductBrandsQuery } from "@redux/api/productApiSlice";

const Filter = ({ searchParams, setSearchParams }) => {
	const { categories } = useSelector((state) => state.shop);

	const dispatch = useDispatch();
	const categoriesQuery = useFetchCategoriesQuery();
	const [selectedBrand, setSelectedBrand] = useState(() => {
		const currentParams = new URLSearchParams(searchParams);
		return currentParams.get("brand") || "all";
	});

	useEffect(() => {
		if (!categoriesQuery.isLoading) {
			dispatch(setCategories(categoriesQuery.data));
		}
	}, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

	const { data: brands } = useGetProductBrandsQuery();

	const isCategoryChecked = (categoryId) => {
		const currentParams = new URLSearchParams(searchParams);
		return currentParams.getAll("productCategoryId").includes(categoryId);
	};

	const handleSelectCategory = (isChecked, categoryId) => {
		const currentParams = new URLSearchParams(searchParams);

		let selectedCategories = currentParams.getAll("productCategoryId");

		if (isChecked) {
			selectedCategories.push(categoryId);
			selectedCategories = [...new Set(selectedCategories)];
		} else {
			selectedCategories = selectedCategories.filter((id) => id !== categoryId);
		}

		currentParams.delete("productCategoryId");
		selectedCategories.forEach((category) =>
			currentParams.append("productCategoryId", category)
		);

		setSearchParams(currentParams);
	};

	const handleSelectBrand = (e) => {
		setSelectedBrand(e.target.value);
		const currentParams = new URLSearchParams(searchParams);

		if (e.target.value === "all") {
			currentParams.delete("productBrand");
		} else {
			currentParams.set("productBrand", e.target.value);
		}

		setSearchParams(currentParams);
	};

	return (
		<div className="w-full">
			<h2 className="py-2 rounded-md text-button-red font-medium">
				Filter by Categories
			</h2>

			<div className="sm:p-5 flex flex-col gap-2 mb-2">
				{categories?.map((category) => (
					<label
						key={category._id}
						className="ml-2 flex gap-2 items-center capitalize text-sm font-medium text-primary-d"
					>
						<input
							value={category._id}
							name="category"
							type="checkbox"
							id="red-checkbox"
							checked={isCategoryChecked(category._id)}
							onChange={(e) =>
								handleSelectCategory(e.target.checked, category._id)
							}
							className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
						/>

						{category.name}
					</label>
				))}
			</div>

			<h2 className="py-2 rounded-md text-button-red font-medium">
				Filter by Brands
			</h2>

			<div className="sm:p-5 flex flex-col gap-2 mb-2">
				<label className="ml-2 flex gap-2 items-center text-sm font-medium">
					<input
						type="radio"
						id="all"
						name="brand"
						value="all"
						checked={selectedBrand === "all"}
						onChange={(e) => handleSelectBrand(e)}
						className="w-4 h-4  bg-gray-100 border-gray-300"
					/>
					All
				</label>
				{brands?.map((brand) => (
					<label
						key={brand}
						className="ml-2 flex gap-2 items-center text-sm font-medium"
					>
						<input
							type="radio"
							value={brand}
							id={brand}
							checked={selectedBrand === brand}
							name="brand"
							onChange={(e) => handleSelectBrand(e)}
							className="w-4 h-4  bg-gray-100 border-gray-300"
						/>

						{brand}
					</label>
				))}
			</div>

			<h2 className="py-2 rounded-md text-button-red font-medium">
				Filter by Price
			</h2>

			<input
				type="text"
				placeholder="Enter Price"
				// value={queryParams.productPrice}
				// onChange={handleSelectPrice}
				className="w-full px-3 py-2 input-primary"
			/>

			<div className="p-5 pt-5">
				<button
					className="w-full p-2 bg-button-red hover:bg-button-hover1 rounded-md"
					// onClick={handleClearFilter}
				>
					Reset
				</button>
			</div>
		</div>
	);
};

Filter.propTypes = {
	searchParams: PropTypes.object,
	setSearchParams: PropTypes.func,
};

export default Filter;

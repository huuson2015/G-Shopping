import { PropTypes } from "prop-types";
import { useState, Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "@redux/api/categoryApiSlice";

import { setCategories } from "@redux/features/shop/shopSlice";
import { useEffect } from "react";
import { useGetProductBrandsQuery } from "@redux/api/productApiSlice";

import { Range } from "react-range";
import debounce from "lodash/debounce";

const Filter = ({ searchParams, setSearchParams }) => {
	const { categories } = useSelector((state) => state.shop);

	const dispatch = useDispatch();
	const categoriesQuery = useFetchCategoriesQuery();
	const [selectedBrand, setSelectedBrand] = useState(() => {
		const currentParams = new URLSearchParams(searchParams);
		return currentParams.get("brand") || "all";
	});

	const [price, setPrice] = useState(() => {
		const currentParams = new URLSearchParams(searchParams);
		return [currentParams.get("productPrice")] || [0];
	});

	const [selectedPrice, setSelectedPrice] = useState(() => {
		const currentParams = new URLSearchParams(searchParams);
		return [currentParams.get("productPrice")] || [0];
	});

	const handleChangePrice = (setValue) => {
		setPrice(setValue);
		const debouncedSetSelectedPrice = debounce(
			() => {
				setSelectedPrice(setValue);
			},
			500,
			{ leading: false, trailing: true }
		);
		debouncedSetSelectedPrice();
	};

	useEffect(() => {
		const currentParams = new URLSearchParams(searchParams);
		currentParams.set("productPrice", selectedPrice);
		setSearchParams(currentParams);
	}, [selectedPrice, searchParams, setSearchParams]);

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
		<div className="w-full rounded-lg">
			<h2 className="py-2 rounded-md text-button-red font-medium">
				Filter by Categories
			</h2>
			<div className="sm:p-3 flex flex-col gap-2">
				{categories?.map((category) => (
					<label
						key={category._id}
						className="flex gap-2 items-center capitalize text-sm font-medium text-primary-d"
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
			<div className="sm:p-3 flex flex-col gap-2">
				<label className="flex gap-2 items-center text-sm font-medium">
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
						className="flex gap-2 items-center text-sm font-medium"
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
			<div className="px-4">
				<div className="flex justify-between mb-1">
					<div>$ 0</div>
					<div>$ 1000</div>
				</div>
				<Range
					key="range-component"
					step={50}
					min={0}
					max={1000}
					values={price}
					onChange={(setValue) => handleChangePrice(setValue)}
					renderTrack={({ props, children }) => (
						<div className="w-full h-2 bg-gray-200 rounded-full" {...props}>
							{children}
						</div>
					)}
					renderThumb={({ props }) => {
						const { key, ...rest } = props;
						return (
							<div
								key={key}
								className="size-5 bg-button-red rounded-full flex items-center justify-center"
								{...rest}
							/>
						);
					}}
				/>
			</div>
		</div>
	);
};

Filter.propTypes = {
	searchParams: PropTypes.object,
	setSearchParams: PropTypes.func,
};

export default Filter;

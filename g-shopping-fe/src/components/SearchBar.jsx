import { BiSearch } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchParams, setSearchParams] = useSearchParams({
		productName: "",
	});

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const navigate = useNavigate();
	const location = useLocation();

	const handleSearchSubmit = () => {
		setSearchParams((prev) => prev.set("productName", searchTerm));

		if (location.pathname !== "/shop" && searchTerm !== "") {
			navigate(`/shop?${searchParams.toString()}`);
		}
	};

	return (
		<div className="group relative">
			<input
				type="text"
				name="search"
				id="search"
				value={searchTerm}
				onChange={(e) => handleSearchChange(e)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSearchSubmit();
					}
				}}
				className="w-full py-1 px-5 input-primary"
				placeholder="What are you looking for?"
			/>
			<button
				onClick={() => handleSearchSubmit()}
				type="button"
				className="absolute right-2 top-2 group-hover:text-button-hover2"
			>
				<BiSearch size={20} />
			</button>
		</div>
	);
};

export default SearchBar;

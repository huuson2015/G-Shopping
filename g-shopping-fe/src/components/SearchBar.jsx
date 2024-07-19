import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
	return (
		<div className="group relative">
			<input
				type="text"
				className="w-full px-5 py-1 bg-gray-200 border rounded placeholder:text-sm hover:border-button-hover2 focus:outline-none focus:border-button-hover2"
				placeholder="What are you looking for?"
			/>
			<button
				type="button"
				className="absolute right-2 top-2 group-hover:text-button-hover2"
			>
				<BiSearch size={20} />
			</button>
		</div>
	);
};

export default SearchBar;

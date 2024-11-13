import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import {
	addFavoriteToLocalStorage,
	getFavoritesFromLocalStorage,
	removeFavoriteFromLocalStorage,
} from "../utils/localStorage";
import {
	addToFavorites,
	removeFromFavorites,
	setFavorites,
} from "../redux/features/favorites/favoriteSlice";

const HeartButton = ({ product }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites) || [];
	const isFavorite = favorites.some((p) => p._id === product._id);

	useEffect(() => {
		const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
		dispatch(setFavorites(favoritesFromLocalStorage));
	}, [dispatch]);

	const toggleFavorites = () => {
		if (isFavorite) {
			dispatch(removeFromFavorites(product));
			removeFavoriteFromLocalStorage(product._id);
		} else {
			dispatch(addToFavorites(product));
			addFavoriteToLocalStorage(product);
		}
	};

	return (
		<div
			className="absolute top-2 right-2 cursor-pointer p-2 bg-button-hover1/30 rounded-full"
			onClick={() => toggleFavorites()}
		>
			{isFavorite ? (
				<FaHeart size={20} className="text-button-red" />
			) : (
				<FaRegHeart size={20} className="text-button-red" />
			)}
		</div>
	);
};

HeartButton.propTypes = {
	product: PropTypes.object.isRequired,
};

export default HeartButton;

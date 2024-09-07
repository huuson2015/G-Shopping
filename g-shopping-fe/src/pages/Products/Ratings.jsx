import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { PropTypes } from "prop-types";

const Ratings = ({ value, text, color }) => {
	const fullStars = Math.floor(value);
	const halfStars = value - fullStars > 0.5 ? 1 : 0;
	const emptyStar = 5 - fullStars - halfStars;

	return (
		<div className="flex items-center gap-1">
			{[...Array(fullStars)].map((_, index) => (
				<FaStar key={index} size={16} className="text-yellow-500" />
			))}

			{halfStars === 1 && (
				<FaStarHalfAlt size={16} className="text-yellow-500" />
			)}
			{[...Array(emptyStar)].map((_, index) => (
				<FaRegStar key={index} size={16} className="text-yellow-500" />
			))}

			<span className={`rating-text ml-{2rem} text-${color}`}>
				{text && text}
			</span>
		</div>
	);
};

Ratings.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string,
	color: PropTypes.string,
};

export default Ratings;

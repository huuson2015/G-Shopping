import { RxCross2 } from "react-icons/rx";
import { PropTypes } from "prop-types";

const CategoryItem = ({
	category,
	setSelectedCategory,
	setIsModalUpdateOpen,
	setUpdatingName,
	toggleModalConfirm,
}) => {
	return (
		<div className="relative group">
			<div
				className=" bg-primary-dark text-white py-2 px-4 rounded-md m-3 hover:cursor-pointer hover:bg-button-hover2 hover:text-text-dark capitalize"
				onClick={() => {
					{
						setIsModalUpdateOpen(true);
						setSelectedCategory(category);
						setUpdatingName(category.name);
					}
				}}
			>
				{category.name}
			</div>
			<button
				className="absolute md:hidden top-1 right-1 rounded-full size-6 group-hover:flex items-center justify-center flex bg-white text-button-red hover:bg-button-red hover:text-white border border-button-red"
				onClick={() => {
					setSelectedCategory(category);
					toggleModalConfirm();
				}}
			>
				<RxCross2 />
			</button>
		</div>
	);
};

CategoryItem.propTypes = {
	category: PropTypes.object.isRequired,
	setSelectedCategory: PropTypes.func.isRequired,
	setIsModalUpdateOpen: PropTypes.func.isRequired,
	setUpdatingName: PropTypes.func.isRequired,
	toggleModalConfirm: PropTypes.func.isRequired,
};

export default CategoryItem;

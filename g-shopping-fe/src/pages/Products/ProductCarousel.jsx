import { useGetTopProductsQuery } from "@redux/api/productApiSlice";
import Message from "@components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";
import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStar,
	FaStore,
} from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { PropTypes } from "prop-types";

const PrevArrow = (props) => {
	const { onClick } = props;

	return (
		<div
			className="absolute hover:cursor-pointer hover:bg-button-hover1 z-10 left-3 top-1/3 text-white bg-button-red rounded-full p-1"
			onClick={onClick}
		>
			<HiChevronLeft size={24} />
		</div>
	);
};
PrevArrow.propTypes = {
	onClick: PropTypes.func,
};
const NextArrow = (props) => {
	const { onClick } = props;

	return (
		<div
			className="absolute hover:cursor-pointer hover:bg-button-hover1 z-10 right-3 top-1/3 text-white bg-button-red rounded-full p-1"
			onClick={onClick}
		>
			<HiChevronRight size={24} />
		</div>
	);
};

NextArrow.propTypes = {
	onClick: PropTypes.func,
};

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	const settings = {
		dots: false,
		draggable: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		cssTransitions: true,
	};

	return (
		<div className="lg:w-1/2 border rounded-lg bg-gray-50">
			{isLoading ? null : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Slider {...settings} className="sm:block h-full">
					{products.map(
						({
							image,
							_id,
							name,
							price,
							description,
							brand,
							createdAt,
							numReviews,
							rating,
							quantity,
							countInStock,
						}) => (
							<div
								className="border-none outline-none flex flex-col h-full justify-between"
								key={_id}
							>
								<div className="overflow-hidden">
									<LazyLoadImage
										src={import.meta.env.VITE_IMAGE_URL + image}
										alt={name}
										effect="blur"
										wrapperProps={{
											style: { transitionDelay: "1s" },
										}}
										className="w-full rounded-t-lg object-cover h-[25rem] 3xl:h-[30rem]"
									/>
								</div>

								<div className="mt-2 h-[calc(100%-27rem)] 3xl:h-[calc(100%-32rem)] flex flex-col justify-between gap-2 md:mt-2 p-4">
									<div>
										<div className="flex justify-between">
											<h2 className="font-medium text-[1.5rem]">{name}</h2>
											<p className="font-medium py-1 px-3 bg-button-red rounded-full text-white">
												${price}
											</p>
										</div>
										<p className="">
											<b>Description:</b> {description.substring(0, 170)} ...
										</p>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-1">
										<h1 className="flex items-center">
											<FaStore className="mr-2 text-button-red" /> <b>Brand:</b>
											{brand}
										</h1>
										<h1 className="flex items-center">
											<FaClock className="mr-2 text-button-red" /> <b>Added:</b>
											{moment(createdAt).fromNow()}
										</h1>
										<h1 className="flex items-center ">
											<FaStar className="mr-2 text-button-red" />{" "}
											<b>Reviews:</b>
											{numReviews}
										</h1>

										<h1 className="flex items-center">
											<FaStar className="mr-2 text-button-red" />
											<b>Ratings:</b> {Math.round(rating)}
										</h1>
										<h1 className="flex items-center">
											<FaShoppingCart className="mr-2 text-button-red" />
											<b>Quantity:</b> {quantity}
										</h1>
										<h1 className="flex items-center">
											<FaBox className="mr-2 text-button-red" />
											<b>In Stock:</b> {countInStock}
										</h1>
									</div>
								</div>
							</div>
						)
					)}
				</Slider>
			)}
		</div>
	);
};

export default ProductCarousel;

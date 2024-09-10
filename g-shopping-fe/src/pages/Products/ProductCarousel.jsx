import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
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

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<div className="mb-4 lg:block xl:block md:block">
			{isLoading ? null : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Slider {...settings} className="xl:w-[40rem] 3xl:w-[50rem] sm:block">
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
							<div className="border-none outline-none" key={_id}>
								<LazyLoadImage
									src={image}
									alt={name}
									effect="blur"
									wrapperProps={{
										style: { transitionDelay: "1s" },
									}}
									className="w-full rounded-lg object-cover h-[20rem] 3xl:h-[30rem]"
								/>

								<div className="mt-2 flex flex-col gap-2 md:mt-2">
									<div className="flex justify-between">
										<h2 className="font-medium text-[1.5rem]">{name}</h2>
										<p className="font-medium"> $ {price}</p>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1">
										<h1 className="flex items-center">
											<FaStore className="mr-2 text-button-red" /> <b>Brand:</b>
											{brand}
										</h1>
										<h1 className="flex items-center">
											<FaClock className="mr-2 text-button-red" /> <b>Added:</b>
											{moment(createdAt).fromNow()}
										</h1>
										<h1 className="flex items-center">
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
									<p className="">
										<b>Description:</b> {description.substring(0, 170)} ...
									</p>
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

import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import SmallProductCard from "./SmallProductCard";
import { PropTypes } from "prop-types";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const ProductTabs = ({
	loadingProductReview,
	userInfo,
	submitHandler,
	rating,
	setRating,
	comment,
	setComment,
	product,
}) => {
	const { data, isLoading } = useGetTopProductsQuery();
	const [hover, setHover] = useState(null);

	const handleRating = (value) => {
		setRating(value);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="w-full min-h-[30rem]">
			<TabGroup>
				<TabList className="flex w-full gap-3 mb-4">
					<Tab className="tab-primary">Write Your Review</Tab>
					<Tab className="tab-primary">All Reviews</Tab>
					<Tab className="tab-primary">Related Products</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<div className="mt-4">
							{userInfo ? (
								<form className="flex flex-col gap-2" onSubmit={submitHandler}>
									<div className="">
										<label htmlFor="rating" className="block text-base">
											Rating:
										</label>
										<div className="flex items-center">
											{[...Array(5)].map((_, index) => {
												const ratingValue = index + 1;
												return (
													<label key={index}>
														<input
															type="radio"
															name="rating"
															value={ratingValue}
															className="hidden"
															onClick={() => handleRating(ratingValue)}
														/>
														{ratingValue <= (hover || rating) ? (
															<FaStar
																size={20}
																className="cursor-pointer transition-colors duration-200 text-yellow-500"
																onMouseEnter={() => setHover(ratingValue)}
																onMouseLeave={() => setHover(null)}
															/>
														) : (
															<FaRegStar
																size={20}
																className="cursor-pointer transition-colors duration-200 text-yellow-500"
																onMouseEnter={() => setHover(ratingValue)}
																onMouseLeave={() => setHover(null)}
															/>
														)}
													</label>
												);
											})}
										</div>
									</div>

									<div className="">
										<label htmlFor="comment" className="block mb-2">
											Comment
										</label>

										<textarea
											id="comment"
											rows="3"
											required
											value={comment}
											onChange={(e) => setComment(e.target.value)}
											className="w-full px-5 py-2 bg-gray-200 border rounded placeholder:text-sm hover:border-button-hover2 focus:outline-none focus:border-button-hover2 "
										></textarea>
									</div>
									<div>
										<button
											type="submit"
											disabled={loadingProductReview}
											className="bg-button-red hover:to-button-hover1 text-white py-2 px-4 rounded-lg"
										>
											Submit
										</button>
									</div>
								</form>
							) : (
								<p>
									Please <Link to="/login">sign in</Link> to write a review
								</p>
							)}
						</div>
					</TabPanel>
					<TabPanel>
						<div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

						<div>
							{product.reviews.map((review) => (
								<div
									key={review._id}
									className="bg-gray-200 p-4 rounded-lg mb-5"
								>
									<div className="flex justify-between">
										<strong className="text-primry-dark">{review.name}</strong>
										<p className="text-[#B0B0B0]">
											{review.createdAt.substring(0, 10)}
										</p>
									</div>

									<p className="my-4">{review.comment}</p>
									<Ratings value={review.rating} />
								</div>
							))}
						</div>
					</TabPanel>
					<TabPanel>
						<section className="flex flex-wrap gap-2">
							{!data ? (
								<Loader />
							) : (
								data.map((product) => (
									<div className="w-1/5" key={product._id}>
										<SmallProductCard product={product} />
									</div>
								))
							)}
						</section>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
};

ProductTabs.propTypes = {
	loadingProductReview: PropTypes.bool,
	userInfo: PropTypes.object,
	submitHandler: PropTypes.func,
	rating: PropTypes.number,
	setRating: PropTypes.func,
	comment: PropTypes.string,
	setComment: PropTypes.func,
	product: PropTypes.object,
};

export default ProductTabs;

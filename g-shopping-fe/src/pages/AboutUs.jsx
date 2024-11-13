import { PiHeadset, PiTruck } from "react-icons/pi";
import { GoShieldCheck } from "react-icons/go";
import Loader from "@components/Loader";
import {
	useGetTotalOrdersQuery,
	useGetTotalSalesQuery,
	useGetTotalSalesByDateQuery,
} from "@redux/api/orderApiSlice";
import { useGetUsersQuery } from "@redux/api/userApiSlice";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUserAstronaut } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { PropTypes } from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const AboutUs = () => {
	const { data: sales, isLoading } = useGetTotalSalesQuery();
	const { data: customers } = useGetUsersQuery();
	const { data: orders } = useGetTotalOrdersQuery();
	const { data: salesDetail } = useGetTotalSalesByDateQuery();

	const settings = {
		dots: true,
		centerMode: true,
		draggable: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		cssTransitions: true,
		centerPadding: "20px",
		appendDots: (dots) => (
			<div className="mt-4">
				<ul className="flex justify-center space-x-2"> {dots} </ul>
			</div>
		),
		customPaging: () => (
			<button className="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-500 focus:outline-none"></button>
		),
	};

	return (
		<div className="px-6 sm:px-8 lg:px-[8.438rem] py-4 lg:py-10 gap-4">
			<div className="flex flex-col-reverse md:flex-row gap-4 relative w-full">
				<div className="md:w-1/2  flex flex-col justify-center">
					<h1 className="md:text-3xl font-bold mb-4">Our Story</h1>
					<p className="text-gray-500 text-justify">
						Launced in 2015, Exclusive is South Asia’s premier online shopping
						makterplace with an active presense in Bangladesh. Supported by wide
						range of tailored marketing, data and service solutions, Exclusive
						has 10,500 sallers and 300 brands and serves 3 millioons customers
						across the region.
					</p>
					<p className="text-gray-500 text-justify mt-4">
						Exclusive has more than 1 Million products to offer, growing at a
						very fast. Exclusive offers a diverse assotment in categories
						ranging from consumer.
					</p>
				</div>
				<div className="md:w-1/2">
					<img
						src="/assets/sideImage2.png"
						alt="about-us"
						className="w-full h-[30rem] rounded-md object-cover"
					/>
				</div>
			</div>
			<div className="w-[100%] grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 mt-4">
				<div className="group hover:bg-button-red flex justify-center items-center flex-col gap-2 rounded-lg border border-gray-400 p-5">
					<div className="p-4 group-hover:bg-gray-50 bg-gray-300 rounded-full">
						<RiMoneyDollarCircleLine
							size={60}
							className="text-primary-base  bg-text-dark p-4 rounded-full"
						/>
					</div>
					<h1 className="text-xl font-bold group-hover:text-primary-base">
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : (
							sales.totalSales.toFixed(0)
						)}{" "}
						$
					</h1>

					<p className="text-sm group-hover:text-primary-base">
						Total sales in USD
					</p>
				</div>
				<div className="group hover:bg-button-red flex justify-center items-center flex-col gap-2 rounded-lg border border-gray-400 p-5">
					<div className="p-4 group-hover:bg-gray-50 bg-gray-300 rounded-full">
						<FaUserAstronaut
							size={60}
							className="text-primary-base  bg-text-dark p-4 rounded-full"
						/>
					</div>
					<h1 className="text-xl font-bold group-hover:text-primary-base">
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : (
							customers?.length
						)}
					</h1>

					<p className="text-sm group-hover:text-primary-base">
						Buyer active our site
					</p>
				</div>
				<div className="group hover:bg-button-red flex justify-center items-center flex-col gap-2 rounded-lg border border-gray-400 p-5">
					<div className="p-4 group-hover:bg-gray-50 bg-gray-300 rounded-full">
						<BsHandbagFill
							size={60}
							className="text-primary-base  bg-text-dark p-4 rounded-full"
						/>
					</div>
					<h1 className="text-xl font-bold group-hover:text-primary-base">
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : (
							orders?.totalOrders
						)}
					</h1>

					<p className="text-sm group-hover:text-primary-base">
						Anual order sale in our site
					</p>
				</div>
				<div className="group hover:bg-button-red flex justify-center items-center flex-col gap-2 rounded-lg border border-gray-400 p-5">
					<div className="p-4 group-hover:bg-gray-50 bg-gray-300 rounded-full">
						<BsHandbagFill
							size={60}
							className="text-primary-base  bg-text-dark p-4 rounded-full"
						/>
					</div>
					<h1 className="text-xl font-bold group-hover:text-primary-base">
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : salesDetail ? (
							salesDetail[salesDetail?.length - 1]?.totalSales
						) : (
							0
						)}{" "}
						$
					</h1>

					<p className="text-sm group-hover:text-primary-base">
						Anual sale nearby date in our site
					</p>
				</div>
			</div>
			<div className="my-20">
				<Slider {...settings} className="w-full px-4">
					<div className="p-6">
						<div className="border p-4 flex flex-col justify-center items-center space-y-2">
							<img
								className="self-center"
								src="/assets/image46.png"
								alt="Exclusive"
							/>
							<p className="font-bold text-lg text-center">Exclusive</p>
							<p className="text-sm text-center">
								Exclusive offers a diverse assortment
							</p>
						</div>
					</div>
					<div className="p-6">
						<div className="border p-4 flex flex-col justify-center items-center space-y-2">
							<img
								className="self-center"
								src="/assets/image47.png"
								alt="Exclusive"
							/>
							<p className="font-bold text-lg text-center">Exclusive</p>
							<p className="text-sm text-center">
								Exclusive offers a diverse assortment
							</p>
						</div>
					</div>
					<div className="p-6">
						<div className="border p-4 flex flex-col justify-center items-center space-y-2">
							<img
								className="self-center"
								src="/assets/image51.png"
								alt="Exclusive"
							/>
							<p className="font-bold text-lg text-center">Exclusive</p>
							<p className="text-sm text-center">
								Exclusive offers a diverse assortment
							</p>
						</div>
					</div>
					<div className="p-6">
						<div className="border p-4 flex flex-col justify-center items-center space-y-2">
							<img
								className="self-center"
								src="/assets/image47.png"
								alt="Exclusive"
							/>
							<p className="font-bold text-lg text-center">Exclusive</p>
							<p className="text-sm text-center">
								Exclusive offers a diverse assortment
							</p>
						</div>
					</div>
					<div className="p-6">
						<div className="border p-4 flex flex-col justify-center items-center space-y-2">
							<img
								className="self-center"
								src="/assets/image46.png"
								alt="Exclusive"
							/>
							<p className="font-bold text-lg text-center">Exclusive</p>
							<p className="text-sm text-center">
								Exclusive offers a diverse assortment
							</p>
						</div>
					</div>
					<div className="p-6">
						<div className="border p-4 flex flex-col justify-center items-center space-y-2">
							<img
								className="self-center"
								src="/assets/image46.png"
								alt="Exclusive"
							/>
							<p className="font-bold text-lg text-center">Exclusive</p>
							<p className="text-sm text-center">
								Exclusive offers a diverse assortment
							</p>
						</div>
					</div>
				</Slider>
			</div>
			<div className="flex justify-center items-center gap-11 my-20">
				<div className="flex justify-center items-center flex-col gap-2">
					<div className="p-4 bg-gray-300 rounded-full">
						<PiTruck
							size={60}
							className="text-primary-base bg-text-dark p-4 rounded-full"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-bold text-lg">FREE AND FAST DELIVERY</h2>
						<p className="text-sm">Free delivery for all order over $100</p>
					</div>
				</div>
				<div className="flex justify-center items-center flex-col gap-2">
					<div className="p-4 bg-gray-300 rounded-full">
						<PiHeadset
							size={60}
							className="text-primary-base bg-text-dark p-4 rounded-full"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-bold text-lg">24/7 CUSTOMER SERVICE</h2>
						<p className="text-sm">Friendly 24/7 customer support</p>
					</div>
				</div>
				<div className="flex justify-center items-center flex-col gap-2">
					<div className="p-4 bg-gray-300 rounded-full">
						<GoShieldCheck
							size={60}
							className="text-primary-base bg-text-dark p-4 rounded-full"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-bold text-lg">MONEY BACK GUARANTEE</h2>
						<p className="text-sm">We reurn money within 30 days</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;

import Chart from "react-apexcharts";
import {
	useGetTotalOrdersQuery,
	useGetTotalSalesByDateQuery,
	useGetTotalSalesQuery,
} from "@redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import Loader from "@components/Loader";
import { useGetUsersQuery } from "@redux/api/userApiSlice";

const AdminDashboard = () => {
	const { data: sales, isLoading } = useGetTotalSalesQuery();
	const { data: customers } = useGetUsersQuery();
	const { data: orders } = useGetTotalOrdersQuery();
	const { data: salesDetail } = useGetTotalSalesByDateQuery();

	const [state, setState] = useState({
		options: {
			chart: {
				type: "line",
			},
			tooltip: {
				theme: "dark",
			},
			colors: ["#00E396"],
			dataLabels: {
				enabled: true,
			},
			stroke: {
				curve: "smooth",
			},
			grid: {
				borderColor: "#ccc",
			},
			markers: {
				size: 1,
			},
			xaxis: {
				categories: [],
				title: {
					text: "Date",
				},
			},
			yaxis: {
				title: {
					text: "Sales",
				},
				min: 0,
			},
			legend: {
				position: "top",
				horizontalAlign: "right",
				floating: true,
				offsetY: -25,
				offsetX: -5,
			},
		},
		series: [{ name: "Sales", data: [] }],
	});

	useEffect(() => {
		if (salesDetail) {
			const formattedSalesDate = salesDetail.map((item) => ({
				x: item._id,
				y: item.totalSales,
			}));

			setState((prevState) => ({
				...prevState,
				options: {
					...prevState.options,
					xaxis: {
						categories: formattedSalesDate.map((item) => item.x),
					},
				},

				series: [
					{ name: "Sales", data: formattedSalesDate.map((item) => item.y) },
				],
			}));
		}
	}, [salesDetail]);

	return (
		<section className="px-6 sm:px-8 lg:px-[8.438rem] mt-5">
			<div className="w-[100%] grid grid-cols-3 gap-4">
				<div className="rounded-lg bg-button-red p-5 mt-5">
					<div className="font-bold rounded-full w-[3rem] bg-primary-base text-center p-3">
						$
					</div>

					<p className="mt-5 text-primary-base font-medium">Sales</p>
					<h1 className="text-xl font-bold text-primary-base ">
						${" "}
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : (
							sales.totalSales.toFixed(2)
						)}
					</h1>
				</div>
				<div className="rounded-lg bg-button-red p-5 mt-5">
					<div className="font-bold rounded-full w-[3rem] bg-primary-base text-center p-3">
						$
					</div>

					<p className="mt-5 text-primary-base font-medium">Customers</p>
					<h1 className="text-xl font-bold text-primary-base ">
						${" "}
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : (
							customers?.length
						)}
					</h1>
				</div>
				<div className="rounded-lg bg-button-red p-5 mt-5">
					<div className="font-bold rounded-full w-[3rem] bg-primary-base  text-center p-3">
						$
					</div>

					<p className="mt-5 text-primary-base font-medium">All Orders</p>
					<h1 className="text-xl font-bold text-primary-base ">
						${" "}
						{isLoading ? (
							<div className="size-20">
								<Loader />
							</div>
						) : (
							orders?.totalOrders
						)}
					</h1>
				</div>
			</div>
			<div className="w-full border my-5 rounded-lg p-4 shadow">
				<Chart
					options={state.options}
					series={state.series}
					type="bar"
					width="100%"
				/>
			</div>
		</section>
	);
};

export default AdminDashboard;

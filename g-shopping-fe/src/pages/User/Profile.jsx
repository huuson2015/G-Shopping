import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
	const location = useLocation();

	return (
		<section className="px-6 sm:px-8 lg:px-[8.438rem] py-4 lg:py-10 flex gap-4">
			<div className="flex flex-col w-1/4  md:w-1/5">
				<h1 className="md:text-lg font-medium">Manage my account</h1>
				<div className="pl-2 md:pl-6 py-4 flex flex-col gap-2">
					<Link
						to="/profile/me"
						className={` ${
							location.pathname === "/profile/me"
								? "text-button-red font-medium"
								: "text-gray-500"
						}`}
					>
						My profile
					</Link>
					<Link
						to="/profile/location"
						className={`${
							location.pathname === "/profile/location"
								? "text-button-red font-medium"
								: "text-gray-500"
						}`}
					>
						My location
					</Link>
				</div>
				<h1 className="md:text-lg  font-medium">My Orders</h1>
				<div className="pl-2 md:pl-6 py-4 flex flex-col gap-2">
					<Link
						to="/profile/orders"
						className={`${
							location.pathname === "/profile/orders"
								? "text-button-red font-medium"
								: "text-gray-500"
						}`}
					>
						My order
					</Link>
				</div>
			</div>
			<div className="border p-4 rounded-lg w-3/4 md:w-4/5">
				<Outlet />
			</div>
		</section>
	);
};

export default Profile;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import appRoutes from "./constants";
import {
	AiOutlineBarChart,
	AiOutlineClose,
	AiOutlineHeart,
	AiOutlineLogin,
	AiOutlineLogout,
	AiOutlineMenu,
	AiOutlineShopping,
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineUserAdd,
	AiOutlineUserSwitch,
	AiTwotoneAppstore,
} from "react-icons/ai";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import SearchBar from "./SearchBar";
import FavoritesCount from "./FavoritesCount";
import CartCount from "./CartCount";

const RenderNavigationItem = () => {
	return (
		<>
			<ul className="flex lg:flex-row flex-col gap-12 lg:gap-6 xl:gap-12 items-center">
				{appRoutes.map((item) => {
					return (
						<li key={item.name} className="w-fit">
							<NavLink to={item.path}>
								{({ isActive }) => (
									<div
										className={`relative border-b-2   ${
											isActive
												? "font-bold border-text-gray sm:rounded-none"
												: "text-gray-900 border-transparent"
										}`}
									>
										<div className="flex items-center justify-center rounded-lg transition-colors duration-200 ease-in sm:w-fit">
											<div className="flex gap-2">{item.name}</div>
										</div>
									</div>
								)}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</>
	);
};

const RenderAuthenticateOfUser = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{!userInfo ? (
				<Menu>
					<MenuButton className="hover:text-button-hover2">
						<AiOutlineUser size={26} />
					</MenuButton>
					<MenuItems
						className="bg-white min-w-[10vw] z-50 mt-2 p-2 rounded border shadow-md"
						anchor="bottom end"
					>
						<MenuItem>
							<Link className="flex items-center gap-2 p-2" to="/login">
								<AiOutlineLogin size={20} />
								Login
							</Link>
						</MenuItem>
						<MenuItem>
							<Link className="flex items-center gap-2 p-2" to="/register">
								<AiOutlineUserAdd size={20} />
								Register
							</Link>
						</MenuItem>
					</MenuItems>
				</Menu>
			) : (
				<Menu>
					<MenuButton className="hover:text-button-hover2">
						<AiOutlineUser size={26} />
					</MenuButton>
					<MenuItems
						className="bg-white min-w-[10vw] z-50 mt-2 p-2 rounded border shadow-md"
						anchor="bottom end"
					>
						<div className="border-b border-white" />
						<MenuItem>
							<Link className="flex items-center gap-2 p-2" to="/profile">
								<AiOutlineUser size={20} />
								Profile
							</Link>
						</MenuItem>
						{userInfo.isAdmin && (
							<>
								<MenuItem>
									<Link
										className="flex items-center gap-2 p-2"
										to="/admin/dashboard"
									>
										<AiOutlineBarChart className="" size={20} />
										Dashboard
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										className="flex items-center gap-2 p-2"
										to="/admin/products"
									>
										<AiOutlineShopping size={20} />
										Products
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										className="flex items-center gap-2 p-2"
										to="/admin/categories"
									>
										<AiTwotoneAppstore size={20} />
										Category
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										to="/admin/orders"
										className="flex items-center gap-2 p-2"
									>
										<AiOutlineShoppingCart size={20} />
										Orders
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										className="flex items-center gap-2 p-2"
										to="/admin/users"
									>
										<AiOutlineUserSwitch size={20} />
										Users
									</Link>
								</MenuItem>
							</>
						)}
						<MenuItem>
							<Button
								onClick={logoutHandler}
								className="flex items-center gap-2 p-2"
								to="/register"
							>
								<AiOutlineLogout size={20} />
								Logout
							</Button>
						</MenuItem>
					</MenuItems>
				</Menu>
			)}
		</>
	);
};

const Navigation = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const closeSidebar = () => {
		setShowSidebar(false);
	};

	return (
		<nav className="fixed flex justify-between top-0 z-30 w-screen items-center overflow-hidden bg-white px-6 sm:px-8 lg:px-[8.438rem] py-4 lg:py-10 border-b">
			<Link to="/" className="font-bold text-xl">
				GShopping
			</Link>
			<div className="hidden lg:flex">
				<RenderNavigationItem />
			</div>

			<div className="flex items-center gap-4 justify-center sm:justify-end">
				<div className="hidden md:block">
					<SearchBar />
				</div>
				<Link
					className="flex relative hover:text-button-hover2 items-center gap-4"
					to="/favorite"
				>
					<AiOutlineHeart size={24} />
					<FavoritesCount />
				</Link>
				<Link
					className="flex relative hover:text-button-hover2 items-center "
					to="/cart"
				>
					<AiOutlineShoppingCart size={24} />
					<CartCount />
				</Link>
				<RenderAuthenticateOfUser />
				<div className="flex items-center lg:hidden">
					<Button onClick={toggleSidebar} className="relative">
						<AiOutlineClose
							size={24}
							className={`text-primary-dark absolute ${
								showSidebar ? " opacity-100" : "opacity-0"
							} transition-all duration-300`}
						/>
						<AiOutlineMenu
							size={24}
							className={`text-primary-dark ${
								showSidebar ? " opacity-0" : "opacity-100"
							} transition-all duration-300`}
						/>
					</Button>
					<Dialog
						open={showSidebar}
						as="div"
						className="relative z-40 focus:outline-none"
						onClose={closeSidebar}
					>
						<div className="fixed inset-0 w-screen overflow-y-auto">
							<div className="flex min-h-full">
								<DialogPanel
									transition
									className="md:w-[35vw] lg:hidden border-r pr-2 max-w-md flex flex-col bg-white h-screen pl-3 py-6 transition duration-300 ease-linear data-[closed]:opacity-0"
								>
									<div className="block md:hidden mb-5">
										<SearchBar />
									</div>
									<RenderNavigationItem />
								</DialogPanel>
							</div>
						</div>
					</Dialog>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;

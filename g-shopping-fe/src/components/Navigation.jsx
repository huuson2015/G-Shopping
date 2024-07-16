import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import appRoutes from "../pages/constants";
import {
	AiOutlineClose,
	AiOutlineHeart,
	AiOutlineLogin,
	AiOutlineLogout,
	AiOutlineMenu,
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineUserAdd,
} from "react-icons/ai";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const RenderNavigationItem = () => {
	return (
		<>
			<ul className="flex sm:flex-row flex-col items-center">
				{appRoutes.map((item) => {
					return (
						<li key={item.name} className="sm:ml-2 w-full sm:w-fit">
							<NavLink to={item.path}>
								{({ isActive }) => (
									<div
										className={`relative border sm:border-0 sm:border-b-2  ${
											isActive
												? "font-bold text-dark-linebase border-dark-linebase sm:border-b-dark-linebase rounded sm:rounded-none"
												: "text-gray-900 border-transparent"
										}`}
									>
										<div className="flex items-center justify-center gap-3 rounded-lg p-2 transition-colors duration-200 ease-in sm:w-fit">
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
				<div className="flex items-center justify-center sm:justify-end">
					<Menu>
						<MenuButton className="border hover:bg-primary hover:text-white border-black text-dark p-2 rounded">
							<AiOutlineUser size={26} />
						</MenuButton>
						<MenuItems
							className="bg-white min-w-[10vw] z-50 mt-2 p-2 rounded text-dark border border-black shadow-md"
							anchor="bottom end"
						>
							<MenuItem>
								<Link className="flex items-center gap-2 p-2" to="/login">
									<AiOutlineShoppingCart className="" size={20} />
									Cart
								</Link>
							</MenuItem>
							<MenuItem>
								<Link className="flex items-center gap-2 p-2" to="/login">
									<AiOutlineHeart size={20} />
									Favourite
								</Link>
							</MenuItem>
							<div className="border-b border-white" />
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
				</div>
			) : (
				<div className="flex items-center justify-center sm:justify-end">
					<Menu>
						<MenuButton className="border hover:bg-primary hover:text-white border-black text-dark p-2 rounded">
							<AiOutlineUser size={26} />
						</MenuButton>
						<MenuItems
							className="bg-white min-w-[10vw] z-50 mt-2 p-2 rounded text-dark border border-black shadow-md"
							anchor="bottom end"
						>
							<MenuItem>
								<Link className="flex items-center gap-2 p-2" to="/login">
									<AiOutlineShoppingCart className="" size={20} />
									Cart
								</Link>
							</MenuItem>
							<MenuItem>
								<Link className="flex items-center gap-2 p-2" to="/login">
									<AiOutlineHeart size={20} />
									Favourite
								</Link>
							</MenuItem>
							<div className="border-b border-white" />
							<MenuItem>
								<Link className="flex items-center gap-2 p-2" to="/login">
									<AiOutlineUser size={20} />
									Profile
								</Link>
							</MenuItem>
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
				</div>
			)}
		</>
	);
};

const Navigation = () => {
	// const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	// const toggleDropdown = () => {
	// 	setDropdownOpen(!dropdownOpen);
	// };

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const closeSidebar = () => {
		setShowSidebar(false);
	};

	return (
		<aside className="fixed flex justify-between top-0 z-40 w-screen items-center overflow-hidden bg-white px-4 border-b border-b-dark-linebase">
			<div className="flex w-1/2">
				<Link to="/" className="sm:mr-2 py-3">
					<img
						className="rounded-xl bg-primary/25 p-2"
						src="/assets/home-logo.svg"
						alt=""
					/>
				</Link>
				<div className="hidden sm:flex">
					<RenderNavigationItem />
				</div>
			</div>
			<div className="block sm:hidden">
				<Button onClick={toggleSidebar} className="relative">
					<AiOutlineClose
						size={26}
						className={`text-black absolute ${
							showSidebar ? " opacity-100" : "opacity-0"
						} transition-all duration-300`}
					/>
					<AiOutlineMenu
						size={26}
						className={`text-black ${
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
								className="w-[50vw] border-r border-dark-bg1 pr-2 max-w-md flex flex-col bg-white h-screen justify-between pl-3 py-6 transition duration-300 ease-linear data-[closed]:opacity-0"
							>
								<RenderNavigationItem />
								<RenderAuthenticateOfUser />
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			</div>

			<div className="hidden sm:block w-1/4">
				<RenderAuthenticateOfUser />
			</div>
		</aside>
	);
};

export default Navigation;

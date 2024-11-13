import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

import AppContainer from "../container/AppContainer";

import Loader from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import AdminRoute from "@pages/Admin/AdminRoute";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Auth/Login"));
const Register = lazy(() => import("@pages/Auth/Register"));
const ProductList = lazy(() => import("@pages/Admin/ProductList"));
const CategoryList = lazy(() => import("@pages/Admin/CategoryList"));
const UserList = lazy(() => import("@pages/Admin/UserList"));
const ProductDetails = lazy(() => import("@pages/Products/ProductDetails"));
const Profile = lazy(() => import("@pages/User/Profile"));
const Cart = lazy(() => import("@pages/Cart"));
const Favorites = lazy(() => import("@pages/Products/Favorites"));
const Shop = lazy(() => import("@pages/Shop/Shop"));
const Shipping = lazy(() => import("@pages/Orders/Shipping"));
const OrderSumary = lazy(() => import("@pages/Orders/OrderSumary"));
const OrderDetail = lazy(() => import("@pages/Orders/OrderDetail"));
const UserOrder = lazy(() => import("@pages/User/Contents/UserOrder"));
const Me = lazy(() => import("@pages/User/Contents/Me"));
const Location = lazy(() => import("@pages/User/Contents/Location"));
const OrderList = lazy(() => import("@pages/Admin/OrderList"));
const AdminDashboard = lazy(() => import("@pages/Admin/AdminDashboard"));
const AboutUs = lazy(() => import("@pages/AboutUs"));

const AppRouter = () => {
	return (
		<Suspense
			fallback={
				<div className="h-screen w-screen flex justify-center items-center">
					<div className="size-20">
						<Loader />
					</div>
				</div>
			}
		>
			<Routes>
				<Route path="/" element={<AppContainer />}>
					<Route index path="/" element={<Home />} />
					<Route path="/login" element=<Login /> />
					<Route path="/register" element=<Register /> />
					<Route path="/shop" element=<Shop /> />
					<Route path="/favorite" element=<Favorites /> />
					<Route path="/cart" element={<Cart />} />
					<Route path="/about-us" element=<AboutUs /> />
					<Route path="/product/:id" element=<ProductDetails /> />
					<Route path="" element={<PrivateRoute />}>
						<Route path="profile" element=<Profile />>
							<Route index element={<Navigate to="me" replace />} />
							<Route path="me" element=<Me /> />
							<Route path="orders" element=<UserOrder /> />
							<Route path="location" element=<Location /> />
						</Route>
						<Route path="/shipping" element=<Shipping /> />
						<Route path="/order-sumary" element=<OrderSumary /> />
						<Route path="/order/:id" element={<OrderDetail />} />
					</Route>
					<Route path="/admin" element={<AdminRoute />}>
						<Route path="users" element={<UserList />} />
						<Route path="categories" element={<CategoryList />} />
						<Route path="products" element={<ProductList />} />
						<Route path="orders" element={<OrderList />} />
						<Route path="dashboard" element={<AdminDashboard />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
};

export default AppRouter;

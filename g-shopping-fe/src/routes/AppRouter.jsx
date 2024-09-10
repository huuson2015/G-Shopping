import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

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
const Shop = lazy(() => import("@pages/Shop"));

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
					<Route path="/product/:id" element=<ProductDetails /> />
					<Route path="" element={<PrivateRoute />}>
						<Route path="/profile" element=<Profile /> />
					</Route>
					<Route path="/admin" element={<AdminRoute />}>
						<Route path="users" element={<UserList />} />
						<Route path="categories" element={<CategoryList />} />
						<Route path="products" element={<ProductList />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
};

export default AppRouter;

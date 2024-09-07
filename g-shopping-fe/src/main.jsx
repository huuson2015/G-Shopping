import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { lazy } from "react";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const Profile = lazy(() => import("./pages/User/Profile.jsx"));

import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index path="/" element={<Home />} />
			<Route path="/login" element=<Login /> />
			<Route path="/register" element=<Register /> />
			<Route path="/shopping" element=<Login /> />
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
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

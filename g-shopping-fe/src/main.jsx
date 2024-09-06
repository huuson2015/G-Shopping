import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index path="/" element={<Home />} />
			<Route path="/login" element=<Login /> />
			<Route path="/register" element=<Register /> />
			<Route path="/cart" element=<Login /> />
			<Route path="/shopping" element=<Login /> />
			<Route path="/favourite" element=<Login /> />
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

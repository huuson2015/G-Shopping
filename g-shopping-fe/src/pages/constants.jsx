import { lazy } from "react";
const Login = lazy(() => import("./Auth/Login"));
const Home = lazy(() => import("./Auth/Register"));

const appRoutes = [
	{
		name: "Home",
		path: "/",
		element: <Home />,
	},
	{
		name: "Shop",
		path: "/shopping",
		element: <Login />,
	},
	{
		name: "About",
		path: "/cart",
		element: <Login />,
	},
	{
		name: "Blogs",
		path: "/favourite",
		element: <Login />,
	},
];

export default appRoutes;

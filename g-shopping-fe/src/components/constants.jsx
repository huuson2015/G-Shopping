import Home from "../pages/Home";
import Login from "../pages/Auth/Login";

const appRoutes = [
	{
		name: "Home",
		path: "/",
		element: <Home />,
	},
	{
		name: "Shop",
		path: "/shop",
		element: <Login />,
	},
	{
		name: "About",
		path: "/about",
		element: <Login />,
	},
	{
		name: "Blogs",
		path: "/blogs",
		element: <Login />,
	},
];

export default appRoutes;

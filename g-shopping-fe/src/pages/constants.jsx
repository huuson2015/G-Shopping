import Home from "./Home";
import Login from "./Auth/Login";

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

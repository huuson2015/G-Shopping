import Navigation from "./../components/Navigation";
import { Outlet } from "react-router-dom";

const AppContainer = () => {
	return (
		<div className="max-w-screen overflow-hidden bg-white sm:flex ">
			<Navigation />
			<main className="h-full w-full mt-[4rem] md:mt-[4.2rem] lg:mt-[7.2rem] sm:pt-0">
				<Outlet />
			</main>
		</div>
	);
};

export default AppContainer;

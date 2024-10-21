import Navigation from "./../components/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "./../components/Footer";

const AppContainer = () => {
	return (
		<div className="max-w-screen overflow-hidden bg-white sm:flex flex-col">
			<Navigation />
			<main className="h-full min-h-[70vh] xl:min-[80vh]: w-full mt-[4rem] md:mt-[4.2rem] lg:mt-[7.2rem] sm:pt-0">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppContainer;

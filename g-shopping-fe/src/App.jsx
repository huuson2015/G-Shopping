import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="max-w-screen overflow-hidden bg-white sm:flex ">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Navigation />
			<main className="h-full w-full mt-[4rem] md:mt-[4.2rem] lg:mt-[7.2rem] sm:pt-0">
				<Outlet />
			</main>
		</div>
	);
}

export default App;

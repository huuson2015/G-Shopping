import { Suspense, lazy, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "@context/app.context";

import routes from "@constant/routes";
import adminRoutes from "@constant/adminRoutes";

const AppContainer = lazy(() => import("../container/app.container"));

const Home = lazy(() => import("@features/Home/index"));

export const AppRouter = () => {
	const { state } = useContext(AppContext);

	return (
		<Suspense fallback={<>Loading...</>}>
			<Routes>
				{state.role === "admin" ? (
					<>
						<Route path="/dashboard" element={<AppContainer />}>
							<Route path="/dashboard/home" element={<Home />} />
							{adminRoutes.map(
								({ layout, pages }) =>
									layout === "dashboard" &&
									pages.map(({ path, element }, key) => (
										<Route
											key={key}
											path={`/dashboard/${path}`}
											element={element}
										/>
									))
							)}
						</Route>
						<Route
							path="*"
							element={<Navigate to="/dashboard/home" replace />}
						/>
					</>
				) : (
					<>
						<Route path="/" element={<AppContainer />}>
							<Route path="" element={<Home />} />
							{routes.map(
								({ path, element }, key) =>
									element && (
										<Route key={key} exact path={path} element={element} />
									)
							)}
							{state.isAuthenticated && <></>}
						</Route>
					</>
				)}
			</Routes>
		</Suspense>
	);
};

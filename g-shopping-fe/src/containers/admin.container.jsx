import { Outlet } from "react-router-dom";

const AdminContainer = () => {
	return (
		<div className="min-h-screen bg-gray-50 bg-opacity-95">
			<div className="px-4 xl:ml-80">
				<Outlet />
			</div>
		</div>
	);
};

export default AdminContainer;

import useUserStore from "@lib/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { currentUser, isLoading } = useUserStore();

	if (!isLoading && !currentUser) return <Navigate to="/login" />;

	if (!isLoading && currentUser) return <Outlet />;
};
export default ProtectedRoute;

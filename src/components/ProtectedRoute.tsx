import { auth } from "@/config/firebase";
import useUserStore from "@lib/useUserStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { currentUser, fetchUserInfo } = useUserStore();
	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			fetchUserInfo(user?.uid as string);
		});

		return () => {
			unSub();
		};
	}, [fetchUserInfo]);
	return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;

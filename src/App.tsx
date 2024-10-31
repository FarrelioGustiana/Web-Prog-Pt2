import { auth } from "@/config/firebase";
import ProtectedRoute from "@components/ProtectedRoute";
import WithNavRoute from "@components/WithNavRoute";
import useUserStore from "@lib/useUserStore";
import SignIn from "@pages/auth/SignIn";
import SignUp from "@pages/auth/SignUp";
import Cart from "@pages/Cart";
import EditProfile from "@pages/EditProfile";
import HomeScreen from "@pages/HomeScreen";
import ProductDetail from "@pages/ProductDetail";
import Profile from "@pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<WithNavRoute />}>
				<Route path="/home" element={<HomeScreen />} />
				<Route path="/product/:productId" element={<ProductDetail />} />
				<Route path="/" element={<Navigate to="/home" />} />

				{/* Protected Routes */}
				<Route path="" element={<ProtectedRoute />}>
					<Route path="/cart" element={<Cart />} />
					<Route path="/profile" element={<Profile />} />s
					<Route path="/editProfile" element={<EditProfile />} />
				</Route>
			</Route>

			{/* Public Routes */}
			<Route path="/login" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
		</Route>
	)
);

const App = () => {
	const { fetchUserInfo } = useUserStore();

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			fetchUserInfo(user?.uid as string);
		});

		return () => {
			unSub();
		};
	}, []);

	return (
		<>
			{/* Add loading bar component */}
			<Toaster richColors position="top-left" />
			<RouterProvider router={router} />
		</>
	);
};

export default App;

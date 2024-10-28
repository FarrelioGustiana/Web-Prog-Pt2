import ProtectedRoute from "@components/ProtectedRoute";
import SignIn from "@pages/auth/SignIn";
import SignUp from "@pages/auth/SignUp";
import Cart from "@pages/Cart";
import HomeScreen from "@pages/HomeScreen";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/login" element={<SignIn />} />
			<Route path="/register" element={<SignUp />} />
			<Route path="/home" element={<HomeScreen />} />
			<Route path="/" element={<Navigate to="/home" />} />

			<Route path="" element={<ProtectedRoute />}>
				<Route path="/cart" element={<Cart />} />
			</Route>
		</Route>
	)
);

const App = () => {
	return (
		<>
			<Toaster richColors position="top-left" />
			<RouterProvider router={router} />
		</>
	);
};

export default App;

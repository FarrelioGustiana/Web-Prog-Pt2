import Header from "@components/Header";
import { Outlet } from "react-router";

const WithNavRoute = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
export default WithNavRoute;

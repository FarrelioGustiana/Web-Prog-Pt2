import Header from "@components/Header";
import { Link } from "react-router-dom";

const HomeScreen = () => {
	return (
		<div>
			<Header />
			<Link to="/register">Register</Link>
			<Link to="/login">login</Link>
		</div>
	);
};
export default HomeScreen;

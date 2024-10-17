import Searchinput from "@components/Searchinput";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [cartCount, setCartCount] = useState(0);
	return (
		<div className="bg-third flex flex-col md:flex-row md:w-full md:items-center px-11 py-3 md:py-4 gap-2 md:gap-5 md:h-[90px] h-[120px] justify-center">
			<div className="flex items-center justify-between">
				<h1 className="font-bold md:text-xl cursor-default">
					BLUESHOP.COM
				</h1>
				<Link
					to="./login"
					className="no-underline border inline-flex py-1 px-2 rounded md:hidden font-medium tracking-wide hover:bg-primary border-primary hover:text-third transition-all"
				>
					Sign In
				</Link>
			</div>
			<div className="flex items-center md:w-full flex-1">
				<Searchinput />
				<div className="cursor-pointer relative ml-2 flex items-center justify-center">
					<Link
						to="#"
						className="flex items-center justify-center relative"
					>
						<FaShoppingCart size={38} />
						<p className="text-fourth text-sm font-medium text-center -mt-[15%] -ml-[44%]">
							{cartCount}
						</p>
					</Link>
				</div>
				<div className="signIn-button hidden md:inline-flex md:w-[110px] md:justify-center">
					<Link
						to="/login"
						className="no-underline border py-1 px-2 rounded font-medium tracking-wide hover:bg-primary border-primary hover:text-third transition-all"
					>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Navbar;

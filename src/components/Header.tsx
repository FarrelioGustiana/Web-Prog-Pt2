import Navbar from "@components/Navbar";
import Slider from "@components/Slider";

const Header = () => {
	return (
		<div>
			<div className="relative flex-col-reverse md:flex-col flex duration-1000 text-primary">
				<div className="px-11 py-1 text-sm bg-fourth">
					<p>Indonesia, West Java, Bekasi Regency, North Cikarang</p>
				</div>
				<Navbar />
			</div>

			<Slider />
		</div>
	);
};
export default Header;

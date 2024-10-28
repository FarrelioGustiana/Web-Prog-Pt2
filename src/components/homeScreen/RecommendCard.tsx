import { ShoppingCart } from "lucide-react";
import slideOne from "@assets/images/slide1.jpg";

const RecommendCard = () => {
	return (
		<div className="w-[250px] bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
			<div className="relative">
				<img src={slideOne} className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
			</div>
			<div className="p-4">
				<h3 className="font-bold text-lg mb-1">Camera</h3>
				<p className="text-sm text-gray-600 mb-4">
					High-quality digital camera for all your photography needs.
				</p>
				<div className="flex items-center justify-between">
					<span className="text-lg font-semibold">$148.99</span>
					<button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-300 hover:bg-blue-700">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};
export default RecommendCard;

import { useState } from "react";
import { ShoppingCart, MapPin, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import useUserStore from "@lib/useUserStore";

export default function Header() {
	const { currentUser, isLoading } = useUserStore();
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<header className="bg-[#ffffff]">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-2 text-xs text-[#004a7c]">
					<div className="flex items-center">
						<MapPin className="h-4 w-4 mr-1" />
						<span className="hidden sm:inline">
							Indonesia, West Java, Bekasi Regency, North Cikarang
						</span>
						<span className="sm:hidden">North Cikarang</span>
					</div>
				</div>
			</div>
			<div className="border border-[#E8F1F5]">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						<Link
							to="/"
							className="text-xl font-bold text-[#005691]"
						>
							BLUESHOP.COM
						</Link>
						<div className="hidden md:flex items-center space-x-4 flex-1 max-w-xl mx-8">
							<div className="relative w-full">
								<input
									type="search"
									placeholder="Search products..."
									className="w-full py-2 px-4 pr-10 rounded-full border border-[#E8F1F5] focus:outline-none focus:ring-2 focus:ring-[#005691] focus:border-transparent"
								/>
								<button
									type="submit"
									className="absolute right-3 top-1/2 transform -translate-y-1/2"
								>
									<Search className="h-5 w-5 text-[#005691]" />
								</button>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setIsSearchOpen(!isSearchOpen)}
								className="md:hidden p-2 text-[#004a7c] hover:text-[#005691] transition-colors"
							>
								<Search className="h-6 w-6" />
							</button>
							<Link
								to="/cart"
								className="relative p-2 text-[#004a7c] hover:text-[#005691] transition-colors"
							>
								<ShoppingCart className="h-6 w-6" />
								<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#005691] rounded-full">
									0
								</span>
							</Link>
							{!currentUser && !isLoading ? (
								<Link to="/login" className="inline-flex">
									<button className="px-4 py-2 border border-[#005691] text-[#005691] font-medium rounded-md hover:bg-[#005691] hover:text-white transition-colors">
										Sign In
									</button>
								</Link>
							) : (
								<div className="block overflow-hidden">
									{currentUser?.avatar ? (
										<img
											src={currentUser.avatar}
											className="w-10 h-10 rounded-full"
										/>
									) : (
										<div className="w-10 h-10 rounded-full bg-[#E8F1F5] flex items-center justify-center">
											<User className="h-6 w-6 text-[#005691]" />
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{isSearchOpen && (
				<div className="md:hidden border-b border-[#E8F1F5] py-2">
					<div className="container mx-auto px-4">
						<div className="relative">
							<input
								type="search"
								placeholder="Search products..."
								className="w-full py-2 px-4 pr-10 rounded-2xl border border-[#E8F1F5] focus:outline-none focus:ring-2 focus:ring-[#005691] focus:border-transparent"
							/>
							<button
								type="submit"
								className="absolute right-3 top-1/2 transform -translate-y-1/2"
							>
								<Search className="h-5 w-5 text-[#005691]" />
							</button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

import { User as UserIcon, MapPin, Package, PenSquare } from "lucide-react";
import useUserStore from "@lib/useUserStore";
import { useNavigate } from "react-router";

function Profile() {
	// Mock user data - in production, this would come from your user store
	const { currentUser: user } = useUserStore();

	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#fafafa]">
			{/* Profile Header */}
			<div className="bg-[#fafafa] border-b border-[#E8F1F5] py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center">
						<div className="relative">
							{user ? (
								user.avatar ? (
									<img
										src={user.avatar as string}
										alt={user?.username}
										className="w-32 h-32 rounded-full border-4 border-[#E8F1F5] shadow-lg object-cover"
									/>
								) : (
									<div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-[#E8F1F5] shadow-lg">
										<UserIcon className="h-16 w-16 text-[#005691]" />
									</div>
								)
							) : null}
						</div>
						<h1 className="mt-4 text-3xl font-bold text-[#004a7c]">
							{user?.username}
						</h1>
						{user?.location && (
							<p className="mt-2 text-[#005691] flex items-center">
								<MapPin className="w-4 h-4 mr-2" />
								{user?.location}
							</p>
						)}
						<p className="mt-1 text-[#004a7c]">{user?.email}</p>
						<button
							onClick={() => navigate("/editProfile")}
							className="mt-6 px-6 py-2 bg-[#005691] text-white rounded-full flex items-center transition-colors hover:bg-[#004a7c] shadow-md hover:shadow-lg"
						>
							<PenSquare className="w-4 h-4 mr-2" />
							Edit Profile
						</button>
					</div>
				</div>
			</div>

			{/* Products Section */}
			<div className="container mx-auto px-4 py-12">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-[#004a7c] flex items-center">
						<Package className="w-6 h-6 mr-2" />
						My Products
					</h2>
					<button className="px-4 py-2 bg-[#005691] text-white rounded-md hover:bg-[#004a7c] transition-colors shadow-md hover:shadow-lg">
						Add New Product
					</button>
				</div>

				{user?.products ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{user.products.map((product) => (
							<div
								key={product.id}
								className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#E8F1F5]"
							>
								<div className="h-48 overflow-hidden">
									<img
										src={product.image as string}
										alt={product.name}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="p-4 bg-[#fafafa]">
									<h3 className="text-lg font-semibold text-[#004a7c]">
										{product.name}
									</h3>
									<p className="text-xl font-bold text-[#005691] mt-2">
										${product.price.toFixed(2)}
									</p>
									<div className="mt-4 flex space-x-2">
										<button className="flex-1 px-4 py-2 bg-[#005691] text-white rounded-md hover:bg-[#004a7c] transition-colors shadow-sm hover:shadow-md">
											Edit
										</button>
										<button className="px-4 py-2 border border-[#005691] text-[#005691] rounded-md hover:bg-[#E8F1F5] transition-colors">
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-lg shadow-sm border border-[#E8F1F5]">
						<Package className="w-16 h-16 mx-auto text-[#E8F1F5]" />
						<h3 className="mt-4 text-xl font-semibold text-[#004a7c]">
							No Products Yet
						</h3>
						<p className="mt-2 text-[#004a7c]">
							Start selling by adding your first product
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Store } from "lucide-react";
import { Link } from "react-router-dom";

type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
	seller: string;
};

const initialCartItems: CartItem[] = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: 99.99,
		quantity: 1,
		image: "/placeholder.svg?height=80&width=80",
		seller: "TechGadgets Inc.",
	},
	{
		id: 2,
		name: "Smartphone Case",
		price: 19.99,
		quantity: 2,
		image: "/placeholder.svg?height=80&width=80",
		seller: "MobileAccessories Co.",
	},
	{
		id: 3,
		name: "USB-C Cable",
		price: 9.99,
		quantity: 3,
		image: "/placeholder.svg?height=80&width=80",
		seller: "ElectroWires Ltd.",
	},
];

export default function UserCartPage() {
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

	const updateQuantity = (id: number, change: number) => {
		setCartItems((items) =>
			items
				.map((item) =>
					item.id === id
						? {
								...item,
								quantity: Math.max(0, item.quantity + change),
						  }
						: item
				)
				.filter((item) => item.quantity > 0)
		);
	};

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold text-[#005691] mb-6">
				Your Cart
			</h1>
			{cartItems.length === 0 ? (
				<div className="text-center py-8">
					<ShoppingCart className="h-16 w-16 text-[#004a7c] mx-auto mb-4" />
					<p className="text-lg text-[#004a7c]">Your cart is empty</p>
					<Link
						to="/"
						className="mt-4 inline-block px-6 py-2 bg-[#005691] text-white rounded-md hover:bg-[#004a7c] transition-colors"
					>
						Continue Shopping
					</Link>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-2/3">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex flex-col sm:flex-row items-start sm:items-center border-b border-[#E8F1F5] py-4"
							>
								<img
									src={item.image}
									alt={item.name}
									className="w-20 h-20 object-cover rounded-md mr-4 mb-4 sm:mb-0"
								/>
								<div className="flex-grow mb-4 sm:mb-0">
									<h2 className="text-lg font-semibold text-[#004a7c]">
										{item.name}
									</h2>
									<p className="text-[#005691] font-medium">
										${item.price.toFixed(2)}
									</p>
									<div className="flex items-center mt-2 text-sm text-[#004a7c]">
										<Store className="h-4 w-4 mr-1" />
										<span>{item.seller}</span>
									</div>
								</div>
								<div className="flex items-center">
									<button
										onClick={() =>
											updateQuantity(item.id, -1)
										}
										className="p-1 text-[#004a7c] hover:text-[#005691]"
									>
										<Minus className="h-4 w-4" />
									</button>
									<span className="mx-2 w-8 text-center">
										{item.quantity}
									</span>
									<button
										onClick={() =>
											updateQuantity(item.id, 1)
										}
										className="p-1 text-[#004a7c] hover:text-[#005691]"
									>
										<Plus className="h-4 w-4" />
									</button>
									<button
										onClick={() =>
											updateQuantity(
												item.id,
												-item.quantity
											)
										}
										className="ml-4 p-1 text-[#004a7c] hover:text-[#005691]"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="lg:w-1/3">
						<div className="bg-[#E8F1F5] rounded-md p-6">
							<h2 className="text-xl font-semibold text-[#004a7c] mb-4">
								Order Summary
							</h2>
							<div className="flex justify-between mb-2">
								<span>Subtotal</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Shipping</span>
								<span>Free</span>
							</div>
							<div className="border-t border-[#004a7c] mt-4 pt-4 flex justify-between font-semibold">
								<span>Total</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
							<button className="w-full mt-6 px-6 py-3 bg-[#005691] text-white rounded-md hover:bg-[#004a7c] transition-colors">
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

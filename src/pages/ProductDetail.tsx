import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";

interface Comment {
	id: number;
	user: string;
	content: string;
	rating: number;
}

const ProductDetail = () => {
	const [comments, setComments] = useState<Comment[]>([
		{
			id: 1,
			user: "John Doe",
			content: "Great product! Highly recommended.",
			rating: 5,
		},
		{
			id: 2,
			user: "Jane Smith",
			content: "Good quality for the price.",
			rating: 4,
		},
	]);
	const [newComment, setNewComment] = useState("");

	const addComment = () => {
		if (newComment.trim()) {
			setComments([
				...comments,
				{
					id: comments.length + 1,
					user: "You",
					content: newComment,
					rating: 5, // Default rating
				},
			]);
			setNewComment("");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-6xl mx-auto p-10">
				<div className="grid md:grid-cols-2 gap-8">
					{/* Product Image */}
					<div className="bg-white rounded-lg overflow-hidden shadow-lg">
						<img
							src="/placeholder.svg"
							alt="Premium Wireless Headphones"
							className="w-full h-[400px] object-cover"
						/>
					</div>

					{/* Product Details */}
					<div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-4 text-[#005691]">
								Premium Wireless Headphones
							</h1>
							<p className="text-2xl font-semibold mb-4">
								$199.99
							</p>
							<div className="flex items-center mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="w-5 h-5 fill-[#005691] text-[#005691]"
									/>
								))}
								<span className="ml-2 text-gray-600">
									(4.8 out of 5)
								</span>
							</div>
							<p className="mb-4 text-gray-600">
								Seller: AudioTech Inc.
							</p>
						</div>

						<button
							className="w-full bg-[#005691] hover:bg-[#004571] text-white font-bold py-2 px-4 rounded flex items-center justify-center"
							aria-label="Add to Cart"
						>
							<ShoppingCart className="mr-2 h-4 w-4" /> Add to
							Cart
						</button>
					</div>
				</div>

				{/* Description */}
				<div className="mt-8 bg-white rounded-lg shadow-lg">
					<div className="p-6">
						<h2 className="text-2xl font-bold mb-4 text-[#005691]">
							Product Description
						</h2>
						<p className="text-gray-700">
							Experience unparalleled audio quality with our
							Premium Wireless Headphones. Featuring advanced
							noise-cancellation technology, comfortable over-ear
							design, and long-lasting battery life, these
							headphones are perfect for music enthusiasts and
							professionals alike. With seamless Bluetooth
							connectivity and intuitive touch controls, enjoy
							your favorite tunes with ease.
						</p>
					</div>
				</div>

				{/* Comments Section */}
				<div className="mt-8 bg-white rounded-lg shadow-lg">
					<div className="p-6">
						<h2 className="text-2xl font-bold mb-4 text-[#005691]">
							Customer Reviews
						</h2>
						<div className="space-y-4">
							{comments.map((comment) => (
								<div key={comment.id} className="border-b pb-4">
									<div className="flex items-center mb-2">
										<div className="h-10 w-10 rounded-full bg-[#005691] text-white flex items-center justify-center font-bold text-lg">
											{comment.user[0]}
										</div>
										<div className="ml-3">
											<p className="font-semibold">
												{comment.user}
											</p>
											<div className="flex">
												{[...Array(comment.rating)].map(
													(_, i) => (
														<Star
															key={i}
															className="w-4 h-4 fill-[#005691] text-[#005691]"
														/>
													)
												)}
											</div>
										</div>
									</div>
									<p className="text-gray-700">
										{comment.content}
									</p>
								</div>
							))}
						</div>
						<div className="mt-6">
							<textarea
								placeholder="Write your review..."
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								className="w-full p-2 border rounded mb-2"
								rows={4}
							/>
							<button
								onClick={addComment}
								className="bg-[#005691] hover:bg-[#004571] text-white font-bold py-2 px-4 rounded"
							>
								Submit Review
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;

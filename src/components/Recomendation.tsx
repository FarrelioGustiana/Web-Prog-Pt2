import RecommendCard from "@components/RecommendCard";

const Recommendation = () => {
	return (
		<div className="overflow-hidden flex flex-col gap-8">
			<h3 className="font-bold text-black text-2xl md:text-2xl tracking-wider">
				Recommendation
			</h3>

			<div className="flex gap-9 flex-wrap w-[100%] transition-all duration-500 py-3">
				{Array(10)
					.fill("")
					.map(() => (
						<RecommendCard />
					))}
			</div>
		</div>
	);
};
export default Recommendation;

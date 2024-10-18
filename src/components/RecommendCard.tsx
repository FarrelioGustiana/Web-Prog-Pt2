const RecommendCard = () => {
	return (
		<div className="min-w-[150px] w-[150px] h-[190px] sm:w-[190px] sm:h-[230px] sm:min-w[190px] md:min-w-[195px] md:w-[195px] md:h-[255px] bg-slate-300 rounded-xl overflow-hidden transition-all duration-300 shadow-md">
			<div className="h-[65%] relative">
				<img
					alt="Item Image"
					className="products h-full w-full object-cover"
				/>
				<div className="bg-blue-800/[.15] absolute top-0 left-0 h-full w-full"></div>
			</div>

			<div className="text-desc bg-white h-[35%] py-1.5 px-2 md:py-2 md:px-3 flex flex-col justify-between transition-all duration-300">
				<p className="font-bold tracking-wider">Camera</p>
				<div className="flex items-center justify-between">
					<p className="text-xs lg:text-sm xl:text-md transition-all duration-300">
						$<span>148.99</span>
					</p>
					<button className="text-xs md:text-sm text-white bg-fourth py-[1px] px-3 font-bold rounded-lg transition-all duration-300">
						Add
					</button>
				</div>
			</div>
		</div>
	);
};
export default RecommendCard;

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import RecommendCard from "@components/homeScreen/RecommendCard";

export default function Recommendation() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const recommendationCount = 10;

	const handleScroll = (direction: "left" | "right") => {
		const container = containerRef.current;
		if (container) {
			const scrollAmount = direction === "left" ? -300 : 300;
			container.scrollBy({ left: scrollAmount, behavior: "smooth" });
			setScrollPosition(container.scrollLeft + scrollAmount);
		}
	};

	const handlers = useSwipeable({
		onSwipedLeft: () => handleScroll("right"),
		onSwipedRight: () => handleScroll("left"),
		trackMouse: true,
	});

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			const handleScrollEvent = () => {
				setScrollPosition(container.scrollLeft);
			};
			container.addEventListener("scroll", handleScrollEvent);
			return () =>
				container.removeEventListener("scroll", handleScrollEvent);
		}
	}, []);

	return (
		<div className="w-full  py-8">
			<h2 className="font-bold text-2xl md:text-3xl tracking-wide mb-6">
				Recommendations
			</h2>

			<div className="relative" {...handlers}>
				<div
					ref={containerRef}
					className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-4"
				>
					{Array(recommendationCount)
						.fill("")
						.map((_, index) => (
							<div key={index} className="snap-start shrink-0">
								<RecommendCard />
							</div>
						))}
				</div>

				{scrollPosition > 0 && (
					<button
						onClick={() => handleScroll("left")}
						className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
						aria-label="Scroll left"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
				)}

				{containerRef.current &&
					scrollPosition <
						containerRef.current.scrollWidth -
							containerRef.current.clientWidth -
							10 && (
						<button
							onClick={() => handleScroll("right")}
							className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
							aria-label="Scroll right"
						>
							<ChevronRight className="w-6 h-6" />
						</button>
					)}
			</div>
		</div>
	);
}

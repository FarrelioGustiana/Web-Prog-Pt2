import Recommendation from "@components/homeScreen/Recomendation";
import Slider from "@components/homeScreen/Slider";

const HomeScreen = () => {
	return (
		<div className="pb-5">
			<Slider />
			<main className="mx-11 mt-9 flex flex-col gap-8">
				<Recommendation />
			</main>
		</div>
	);
};
export default HomeScreen;

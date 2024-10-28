import Header from "@components/homeScreen/Header";
import Recommendation from "@components/homeScreen/Recomendation";

const HomeScreen = () => {
	return (
		<div className="pb-5">
			<Header />

			<main className="mx-11 mt-9 flex flex-col gap-8">
				<Recommendation />
			</main>
		</div>
	);
};
export default HomeScreen;

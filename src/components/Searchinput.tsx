import { SearchIcon } from "lucide-react";

const Searchinput = () => {
	return (
		<div className="flex bg-primary items-center w-full relative flex-1 py-2 px-4 rounded-md gap-x-4">
			<input
				type="text"
				placeholder="Search here"
				className="bg-transparent border-none outline-none text-black flex-1"
			/>

			<button>
				<SearchIcon color="#004a7c" />
			</button>
		</div>
	);
};
export default Searchinput;

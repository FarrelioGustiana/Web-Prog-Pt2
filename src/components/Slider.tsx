import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import imgslide1 from "@assets/images/slide1.jpg";
import imgslide2 from "@assets/images/slide2.jpg";
import imgslide3 from "@assets/images/slide3.jpg";
import imgslide4 from "@assets/images/slide4.jpg";
import { useEffect, useRef, useState } from "react";

const Slider = () => {
	const slideImages = [imgslide1, imgslide2, imgslide3, imgslide4];
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const slideContainer = useRef(null);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + slideImages.length) % slideImages.length
		);
	};

	useEffect(() => {}, []);

	return (
		<div className="relative mx-11 my-8 w-sm sm:w-md md:w-lg rounded-xl h-[240px] lg:h-[450px] overflow-hidden duration-1000">
			<div className="absolute top-0 h-full w-max duration-1000 flex">
				{slideImages.map((image, i) => (
					<div key={i}>
						<img
							src={image}
							className="w-screen h-full object-cover"
						/>
					</div>
				))}
			</div>

			<div className="bg-blue-800/[.45] absolute top-0 left-0 h-full w-full"></div>

			<div className="w-[90%] absolute top-[43%] flex justify-between left-[5%]">
				<button
					onClick={prevSlide}
					className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 duration-300"
				>
					<BiSolidLeftArrow color="white" />
				</button>
				<button
					onClick={nextSlide}
					className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 duration-300"
				>
					<BiSolidRightArrow color="white" />
				</button>
			</div>

			<div className="flex h-full justify-center items-end absolute gap-4 lg:gap-7 translate-x-[-50%] left-[50%] bottom-[4%]">
				{slideImages.map((_, i) => (
					<span
						key={i}
						className="duration-1000 w-[12px] h-[12px] bg-white/[.5] inline-flex rounded-full cursor-pointer active"
					></span>
				))}
			</div>
		</div>
	);
};
export default Slider;

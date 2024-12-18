"use client";

import { useEffect, useState } from "react";
import MotionUI from "./motion";
import { CarouselProps } from "@//types/ui";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel: React.FC<CarouselProps> = ({
	images,
	animationDuration = 0.8,
	style = {},
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [x, setX] = useState<{ initial: number; animate: number }>({
		initial: -100,
		animate: 0,
	});

	// Function to handle the previous slide
	const handlePrev = () => {
		setX({ initial: -100, animate: 0 }); // Transition from the left
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	// Function to handle the next slide
	const handleNext = () => {
		setX({ initial: 100, animate: 0 }); // Transition from the right
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};
	const handleIndicators = (index: number) => {
		if (index < currentIndex) {
			setX({ initial: -100, animate: 0 }); // Transition from the left
		} else {
			setX({ initial: 100, animate: 0 }); // Transition from the right
		}
		setCurrentIndex(index);
	};

	// Automatically move to the next slide after a delay
	useEffect(() => {
		const interval = setInterval(() => {
			handleNext();
		}, 5000); // Change slide every 5 seconds

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [currentIndex]);

	return (
		<div
			className={
				"relative w-full h-[92dvh] overflow-hidden " +
				style.containerStyle
			}
		>
			{/* Image Container */}
			<MotionUI
				Tag="div"
				className={
					"absolute inset-0 w-full h-screen flex-shrink-0 bg-cover bg-center " +
					style.imageStyle
				}
				initial={{ opacity: 0, x: x.initial }}
				animate={{ opacity: 1, x: x.animate }}
				transition={{ duration: animationDuration, ease: "easeInOut" }}
				key={currentIndex}
			>
				<Image
					src={images[currentIndex].src}
					alt={images[currentIndex].alt}
					fill
					className="object-contain"
					priority={currentIndex === 0}
				/>
				{/* Overlay Content */}
				<div
					className={
						"w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4 " +
						style.overlayStyle
					}
				>
					{images[currentIndex].heading && (
						<h1
							className={
								"text-4xl md:text-6xl font-bold mb-4 " +
								style.headingStyle
							}
						>
							{images[currentIndex].heading}
						</h1>
					)}
					{images[currentIndex].description && (
						<p
							className={
								"text-lg md:text-xl " + style.descriptionStyle
							}
						>
							{images[currentIndex].description}
						</p>
					)}
				</div>
			</MotionUI>

			{/* Navigation Buttons */}
			<button
				type="button"
				title="left"
				onClick={handlePrev}
				className={
					"absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none " +
					style.buttonStyles
				}
			>
				<ChevronLeft />
			</button>
			<button
				type="button"
				title="right"
				onClick={handleNext}
				className={
					"absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 focus:outline-none " +
					style.buttonStyles
				}
			>
				<ChevronRight />
			</button>

			{/* Indicators */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{images.map((_, index) => (
					<button
						type="button"
						title="arrow"
						key={index}
						onClick={() => handleIndicators(index)}
						className={`w-3 h-3 rounded-full ${
							currentIndex === index
								? "bg-white " + style.indicatorStyles?.active
								: "bg-gray-400 hover:bg-white " +
								  style.indicatorStyles?.inactive
						}`}
					></button>
				))}
			</div>
		</div>
	);
};
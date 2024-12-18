import { MotionProps } from "framer-motion";
import { ImageData } from "./base";

export interface MotionUIProps extends MotionProps {
	Tag: keyof JSX.IntrinsicElements; // This allows dynamic tag names like 'div', 'h1', etc.
	className?: string;
	view?: boolean;
	children: React.ReactNode; // Accept any valid child components or text
}

export interface StylesProps {
	containerStyle?: string; // Style for the main container
	imageStyle?: string; // Style for each image
	overlayStyle?: string; // Style for the overlay content
	headingStyle?: string; // Style for the heading
	descriptionStyle?: string; // Style for the description
	buttonStyles?: string; // Custom styles for navigation buttons
	indicatorStyles?: {
		active: string;
		inactive: string;
	}; // Styles for active and inactive indicators
}

export interface CarouselProps {
	images: ImageData[];
	animationDuration?: number;
	style?: StylesProps;
}

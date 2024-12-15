import { MotionProps } from "framer-motion";

export interface MotionUIProps extends MotionProps {
	Tag: keyof JSX.IntrinsicElements; // This allows dynamic tag names like 'div', 'h1', etc.
	className?: string;
	children: React.ReactNode; // Accept any valid child components or text
}

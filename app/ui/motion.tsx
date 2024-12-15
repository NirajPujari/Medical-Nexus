"use client";
import React from "react";
import { motion, MotionProps } from "framer-motion";
import { MotionUIProps } from "@//types/ui";

export default function MotionUI({
	Tag,
	className,
	initial,
	animate,
	transition,
	children,
}: MotionUIProps) {
	// Dynamically render the motion component with the tag provided
	const Component = motion[Tag as keyof typeof motion] as React.ComponentType<
		MotionProps & { className?: string }
	>;

	return (
		<Component
			className={className}
			initial={initial}
			animate={animate}
			transition={transition}
		>
			{children}
		</Component>
	);
}

"use client";
import React, { useRef } from "react";
import { motion, MotionProps, useInView } from "framer-motion";
import { MotionUIProps } from "@//types/ui";

export default function MotionUI({
	Tag,
	className,
	initial,
	animate,
	view,
	transition,
	children,
}: MotionUIProps) {
	// Dynamically render the motion component with the tag provided
	const Component = motion[Tag as keyof typeof motion] as React.ComponentType<
		MotionProps & {
			className?: string;
			ref?: React.RefObject<HTMLDivElement>;
		}
	>;
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

	return view ? (
		<Component
			ref={ref}
			className={className}
			animate={inView ? animate : initial}
			initial={initial}
			transition={transition}
		>
			{children}
		</Component>
	) : (
		<Component
			className={className}
			animate={animate}
			initial={initial}
			transition={transition}
		>
			{children}
		</Component>
	);
}

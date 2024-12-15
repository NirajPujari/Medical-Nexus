import { useState, useEffect } from "react";

export const useTheme = () => {
	const [theme, setTheme] = useState(
		typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () =>
			setTheme(mediaQuery.matches ? "dark" : "light");
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	// const toggleTheme = () =>
	// 	setTheme((prev) => (prev === "light" ? "dark" : "light"));

	return theme;
};

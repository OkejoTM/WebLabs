"use client"
import { useEffect } from "react";

const determineTheme = () => {
	if (!window.matchMedia) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
};

const selectTheme = (change?: boolean) => {
	let theme: string = localStorage.getItem('theme') || determineTheme();
	if (change) {
		theme = theme === "dark" ? "light" : "dark";
	}
	localStorage.setItem('theme', theme);
	document.body.classList.toggle(`dark`, theme === "dark");
	document.body.classList.toggle(`light`, theme !== "dark");
}

export const useTheme = () => {
	useEffect(() => {
		selectTheme();
	}, []);
	return selectTheme;
}
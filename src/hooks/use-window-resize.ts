import { useEffect } from "react";

export const useWindowResize = (
	callback: (width: number, height: number) => void,
) => {
	useEffect(() => {
		// Call the function on component mount
		callback(window.innerWidth, window.innerHeight);

		// Define a function to handle the resize event
		const handleResize = () => {
			callback(window.innerWidth, window.innerHeight);
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Cleanup function to remove the event listener
		return () => window.removeEventListener("resize", handleResize);
	}, [callback]); // Dependency array includes the callback to re-run if it changes
};

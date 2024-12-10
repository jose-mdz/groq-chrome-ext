import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { MainLayout } from "./components/layout/main-layout";
export default function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<MainLayout />
		</ThemeProvider>
	);
}

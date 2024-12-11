import { ThemeProvider } from "./providers/theme-provider";
import { MainLayout } from "./components/layout/main-layout";
import { SettingsProvider } from "./providers/settings-provider";
import { AppNavProvider } from "./providers/app-nav";
export default function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<SettingsProvider>
				<AppNavProvider>
					<MainLayout />
				</AppNavProvider>
			</SettingsProvider>
		</ThemeProvider>
	);
}

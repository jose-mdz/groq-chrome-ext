import { useEffect, useState } from "react";
import { providerFactory } from "./provider-factory";
import { useSettings } from "./settings-provider";

const [AppNavProvider, useAppNav] = providerFactory(() => {
	const { apiKey } = useSettings();
	const [currentView, setCurrentView] = useState<
		"key" | "summary" | "settings"
	>(apiKey ? "summary" : "key");

	useEffect(() => {
		if (apiKey) {
			setCurrentView("summary");
		} else {
			setCurrentView("key");
		}
	}, [apiKey]);

	return {
		currentView,
		setCurrentView,
	};
});

export { AppNavProvider, useAppNav };

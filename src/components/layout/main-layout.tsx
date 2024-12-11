import { EnterKeyLayout } from "./enter-key/enter-key-layout";
import { PoweredByGroq } from "../shelf/powered-by-groq";
import { PromptLayout } from "./prompt-layout";
import { SettingsLayout } from "./settings/settings-layout";
import { useAppNav } from "@/providers/app-nav";

export function MainLayout() {
	const { currentView } = useAppNav();
	return (
		<div className=" min-w-[375px] ">
			{currentView === "key" ? (
				<EnterKeyLayout />
			) : currentView === "settings" ? (
				<SettingsLayout />
			) : (
				<PromptLayout />
			)}
			<PoweredByGroq />
		</div>
	);
}

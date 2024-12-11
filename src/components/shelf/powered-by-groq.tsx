import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useAppNav } from "@/providers/app-nav";

export function PoweredByGroq() {
	const { currentView, openSettings } = useAppNav();
	return (
		<div className="relative top-[2px] my-4 h-4 bg-[url('/powered-by-groq.png')] bg-contain bg-center bg-no-repeat">
			{currentView === "summary" && (
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-[-12px] right-2 opacity-50 hover:opacity-100 hover:bg-background"
					onClick={openSettings}
				>
					<Settings className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}

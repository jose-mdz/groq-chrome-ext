import { ModeToggle } from "../mode-toggle";
import { SummaryLayout } from "./summary-layout";

export function MainLayout() {
	return (
		<div className="text-sm space-y-4 p-3 min-w-[260px] min-h-[300px] font-inter">
			<SummaryLayout />
			<ModeToggle />
		</div>
	);
}

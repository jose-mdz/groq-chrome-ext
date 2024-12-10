import { ModeToggle } from "../mode-toggle";
import { SummaryLayout } from "./summary-layout";

export function MainLayout() {
	return (
		<div className=" min-w-[260px] min-h-[300px]">
			<SummaryLayout />
			<ModeToggle />
		</div>
	);
}

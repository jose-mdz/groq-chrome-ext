import { useGroqKey } from "@/hooks/use-groq-key";
import { ModeToggle } from "../mode-toggle";
import { SummaryLayout } from "./summary-layout";
import { EnterKeyLayout } from "./enter-key-layout";
import { PoweredByGroq } from "../powered-by-groq";

export function MainLayout() {
	const { key } = useGroqKey();
	return (
		<div className=" min-w-[260px] ">
			{key ? <SummaryLayout /> : <EnterKeyLayout />}
			<PoweredByGroq />
			{/* <ModeToggle /> */}
		</div>
	);
}

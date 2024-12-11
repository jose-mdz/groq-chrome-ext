import { useGroqKey } from "@/hooks/use-groq-key";
import { EnterKeyLayout } from "./enter-key-layout";
import { PoweredByGroq } from "../powered-by-groq";
import { PromptLayout } from "./prompt-layout";

export function MainLayout() {
	const { key } = useGroqKey();
	return (
		<div className=" min-w-[375px] ">
			{key ? <PromptLayout /> : <EnterKeyLayout />}
			<PoweredByGroq />
		</div>
	);
}

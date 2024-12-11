import { ChatLayout } from "./chat-layout";
import { SummaryLayout } from "./summary-layout";

export function PromptLayout() {
	return (
		<>
			<SummaryLayout />
			<ChatLayout />
		</>
	);
}

import { SummaryProvider } from "@/providers/summary-provider";
import { ChatLayout } from "./chat-layout";
import { SummaryLayout } from "./summary-layout";
import { ChatProvider } from "@/providers/chat-provider";

export function PromptLayout() {
	return (
		<>
			<SummaryProvider>
				<SummaryLayout />
				<ChatProvider>
					<ChatLayout />
				</ChatProvider>
			</SummaryProvider>
		</>
	);
}

import { Input } from "@/components/ui/input";
import { useChat } from "@/providers/chat-provider";
import { ChatMessage } from "./chat-message";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

export function ChatComponent() {
	const {
		messages,
		addUserMessage,
		composingMessage,
		setComposingMessage,
		isLoading,
	} = useChat();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addUserMessage(composingMessage);
		setComposingMessage("");
	};

	return (
		<div>
			<div className="flex flex-col">
				{messages
					.filter((m) => m.role !== "system")
					.map((message, index) => (
						<ChatMessage key={message.id} message={message} className="mb-2" />
					))}
			</div>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					autoFocus={true}
					disabled={isLoading}
					placeholder="Ask a question"
					className="flex-1"
					value={composingMessage}
					onChange={(e) => setComposingMessage(e.target.value)}
				/>
				<Button variant={"secondary"} size={"icon"} disabled={isLoading}>
					<SendHorizontal size={16} />
				</Button>
			</form>
		</div>
	);
}

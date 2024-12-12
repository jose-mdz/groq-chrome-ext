import { Input } from "@/components/ui/input";
import { useChat } from "@/providers/chat-provider";
import { ChatMessage } from "./chat-message";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";

export function ChatComponent() {
	const {
		messages,
		addUserMessage,
		composingMessage,
		setComposingMessage,
		isLoading,
		clearMessages,
	} = useChat();

	const { copyToClipboard } = useCopyToClipboard({});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addUserMessage(composingMessage);
		setComposingMessage("");
	};

	useEffect(() => {
		if (messages.length > 0) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
		}
	}, [messages]);

	const copyConversation = () => {
		copyToClipboard(JSON.stringify(messages, null, 2));
		toast.success("Copied conversation to clipboard");
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
					autoFocus
					placeholder="Ask a question"
					className="flex-1"
					value={composingMessage}
					onChange={(e) => setComposingMessage(e.target.value)}
				/>
				<Button
					variant={"secondary"}
					size={"icon"}
					disabled={isLoading || !composingMessage}
				>
					<SendHorizontal size={16} />
				</Button>
			</form>
			{messages.length > 0 && (
				<div className="flex gap-2 justify-center pt-4">
					<Button
						variant={"link"}
						className="underline px-2 opacity-30 hover:opacity-100"
						onClick={clearMessages}
					>
						Clear
					</Button>
					<Button
						variant={"link"}
						className="underline px-2 opacity-30 hover:opacity-100"
						onClick={copyConversation}
					>
						Copy Conversation
					</Button>
				</div>
			)}
		</div>
	);
}

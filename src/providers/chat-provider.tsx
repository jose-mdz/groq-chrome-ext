import type { ChatCompletionMessage } from "@/models";
import { providerFactory } from "./provider-factory";
import { useState, useEffect, useMemo } from "react";
import useGroqChatCompletion from "@/hooks/use-groq-completion";
import { useSummary } from "./summary-provider";
import { truncateTokens } from "@/lib/utils";
import { useSettings } from "./settings-provider";

const [ChatProvider, useChat] = providerFactory(() => {
	const { chunkWordLimit } = useSettings();
	const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
	const [triggerCompletion, setTriggerCompletion] = useState(false);
	const { summarySource, pageText } = useSummary();
	const { fetchChatCompletion, isLoading } = useGroqChatCompletion({
		onResponse: (response) => {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: response, id: crypto.randomUUID() },
			]);
		},
	});
	const wordCount = Number.parseInt(chunkWordLimit);
	const [composingMessage, setComposingMessage] = useState<string>("");
	const systemMessage: ChatCompletionMessage = useMemo(() => {
		return {
			role: "system",
			content: truncateTokens(summarySource || pageText || "", wordCount),
		};
	}, [summarySource, pageText, wordCount]);

	const addUserMessage = (content: string) => {
		setMessages((prev) => [
			...prev,
			{ role: "user", content, id: crypto.randomUUID() },
		]);
		setTriggerCompletion(true);
	};

	const clearMessages = () => {
		setMessages([]);
	};

	useEffect(() => {
		if (triggerCompletion) {
			setTriggerCompletion(false);
			fetchChatCompletion([systemMessage, ...messages]);
		}
	}, [triggerCompletion, messages, fetchChatCompletion, systemMessage]);

	return {
		messages,
		addUserMessage,
		isLoading,
		composingMessage,
		setComposingMessage,
		clearMessages,
	};
});

export { ChatProvider, useChat };

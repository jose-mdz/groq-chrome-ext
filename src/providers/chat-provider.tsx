import type { ChatCompletionMessage } from "@/models";
import { providerFactory } from "./provider-factory";
import { useState, useEffect, useMemo } from "react";
import useGroqChatCompletion from "@/hooks/use-groq-completion";
import { useSummary } from "./summary-provider";

const [ChatProvider, useChat] = providerFactory(() => {
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
	const [composingMessage, setComposingMessage] = useState<string>("");
	const systemMessage: ChatCompletionMessage = useMemo(() => {
		return {
			role: "system",
			content: summarySource || pageText || "",
		};
	}, [summarySource, pageText]);

	const addUserMessage = (content: string) => {
		setMessages((prev) => [
			...prev,
			{ role: "user", content, id: crypto.randomUUID() },
		]);
		setTriggerCompletion(true);
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
	};
});

export { ChatProvider, useChat };

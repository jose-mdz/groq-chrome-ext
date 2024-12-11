import { useState, useEffect } from "react";
import useGroqChatCompletion from "./use-groq-completion";
import type { ChatCompletionMessage } from "@/models";
import { truncateTokens } from "@/lib/utils";

export function useGroqSummary(source: string) {
	const [summary, setSummary] = useState<string>("");
	const { response, isLoading, fetchChatCompletion } = useGroqChatCompletion();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (source) {
			fetchChatCompletion(createMessages(source));
		}
	}, [source]);

	useEffect(() => {
		setSummary(response);
	}, [response]);

	return { summary, isLoading };
}

function createMessages(source: string): ChatCompletionMessage[] {
	return [
		{
			role: "system",
			content: truncateTokens(source, 7000),
		},
		{
			role: "user",
			content:
				"Summarize the text, in a very concise way, use paragraphs and lists and markdown formatting. Be very concise.",
		},
	];
}

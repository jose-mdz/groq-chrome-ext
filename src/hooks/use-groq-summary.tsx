import { useState, useEffect } from "react";
import useGroqChatCompletion from "./use-groq-completion";
import type { ChatCompletionMessage } from "@/models";
import { truncateTokens } from "@/lib/utils";

export function useGroqSummary(source: string) {
	const [summary, setSummary] = useState<string>("");
	const { response, isLoading, fetchChatCompletion, usage } =
		useGroqChatCompletion();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (source) {
			fetchChatCompletion(createMessages(source));
		}
	}, [source]);

	useEffect(() => {
		setSummary(response);
	}, [response]);

	const clearSummary = () => {
		setSummary("");
	};

	const retrySummary = () => {
		clearSummary();
		fetchChatCompletion(createMessages(source));
	};

	return { summary, isLoading, clearSummary, retrySummary, usage };
}

function createMessages(source: string): ChatCompletionMessage[] {
	return [
		{
			role: "system",
			content: truncateTokens(source, 7000),
		},
		{
			role: "user",
			content: `Summarize the text, in a very concise way, 
use paragraphs and lists and markdown formatting. 
Be extremely concise. No more than 3 paragraphs. 
The paragraphs should be consise with no more than 10 words.`,
		},
	];
}

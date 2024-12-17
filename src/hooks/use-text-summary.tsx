import { useState, useEffect, useCallback } from "react";
import useGroqChatCompletion from "./use-groq-completion";
import type { ChatCompletionMessage } from "@/models";
import { truncateTokens } from "@/lib/utils";
import { useSettings } from "@/providers/settings-provider";

export function useTextSummary(source: string) {
	const { summarizePrompt, chunkWordLimit } = useSettings();
	const [summary, setSummary] = useState<string>("");
	const { response, isLoading, fetchChatCompletion, usage } =
		useGroqChatCompletion();

	const count = Number.parseInt(chunkWordLimit);

	useEffect(() => {
		setSummary(response);
	}, [response]);

	const clearSummary = () => {
		setSummary("");
	};

	const retrySummary = () => {
		clearSummary();
		fetchChatCompletion(createMessages(source, summarizePrompt, count));
	};

	const summarize = useCallback(
		(textToSummarize: string) => {
			fetchChatCompletion(
				createMessages(textToSummarize, summarizePrompt, count),
			);
		},
		[summarizePrompt, fetchChatCompletion, count],
	);

	return { summary, isLoading, clearSummary, retrySummary, usage, summarize };
}

function createMessages(
	source: string,
	prompt: string,
	chunkWordLimit: number,
): ChatCompletionMessage[] {
	return [
		{
			role: "system",
			content: truncateTokens(source, chunkWordLimit),
		},
		{
			role: "user",
			content: prompt,
		},
	];
}

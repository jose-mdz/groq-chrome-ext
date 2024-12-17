import { useState, useCallback, useEffect, useMemo } from "react";
import type { ChatCompletionMessage } from "@/models";
import { toast } from "sonner";
import { errorDescription } from "@/lib/utils";
import { useGroq } from "./use-groq";
import type { CompletionUsage } from "groq-sdk/resources";

interface UseGroqChatCompletionProps {
	onResponse?: (response: string) => void;
}

const useGroqChatCompletion = (
	opts: UseGroqChatCompletionProps | undefined = undefined,
) => {
	const { onResponse } = opts || {};
	const [response, setResponse] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [usage, setUsage] = useState<CompletionUsage | null>(null);
	const [triggerEndOfCompletion, setTriggerEndOfCompletion] =
		useState<boolean>(false);

	const { streamChatCompletion } = useGroq();

	const fetchChatCompletion = useCallback(
		async (messages: ChatCompletionMessage[]) => {
			setResponse("");
			setIsLoading(true);

			try {
				const chatCompletion = streamChatCompletion(messages);

				for await (const { content, usage } of chatCompletion) {
					setResponse(content);
					if (usage) {
						setUsage(usage);
					}
				}
				setTriggerEndOfCompletion(true);
			} catch (error) {
				toast.error("Completion failed", {
					description: errorDescription(error),
				});
			} finally {
				setIsLoading(false);
			}
		},
		[streamChatCompletion],
	);

	useEffect(() => {
		if (triggerEndOfCompletion) {
			onResponse?.(response);
			setTriggerEndOfCompletion(false);
		}
	}, [triggerEndOfCompletion, response, onResponse]);

	return { response, isLoading, fetchChatCompletion, usage };
};

export default useGroqChatCompletion;

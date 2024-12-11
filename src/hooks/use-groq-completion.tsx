import { useState, useCallback, useEffect } from "react";
import Groq from "groq-sdk";
import type { ChatCompletionMessage } from "@/models";
import { useSettings } from "@/providers/settings-provider";

interface UseGroqChatCompletionProps {
	onResponse: (response: string) => void;
}

const useGroqChatCompletion = (
	opts: UseGroqChatCompletionProps | undefined = undefined,
) => {
	const { onResponse } = opts || {};
	const { apiKey, currentModel } = useSettings();
	const [response, setResponse] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [triggerEndOfCompletion, setTriggerEndOfCompletion] =
		useState<boolean>(false);

	const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

	const fetchChatCompletion = useCallback(
		async (messages: ChatCompletionMessage[]) => {
			setResponse("");
			setIsLoading(true);

			try {
				const chatCompletion = await groq.chat.completions.create({
					messages: messages.map(({ id, ...message }) => message),
					model: currentModel,
					temperature: 1,
					max_tokens: 8192,
					top_p: 1,
					stream: true,
					stop: null,
				});

				for await (const chunk of chatCompletion) {
					setResponse(
						(prev) => prev + (chunk.choices[0]?.delta?.content || ""),
					);
				}
				setTriggerEndOfCompletion(true);
			} catch (error) {
				console.error("Error fetching chat completion:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[groq, currentModel],
	);

	useEffect(() => {
		if (triggerEndOfCompletion) {
			onResponse?.(response);
			setTriggerEndOfCompletion(false);
		}
	}, [triggerEndOfCompletion, response, onResponse]);

	return { response, isLoading, fetchChatCompletion };
};

export default useGroqChatCompletion;

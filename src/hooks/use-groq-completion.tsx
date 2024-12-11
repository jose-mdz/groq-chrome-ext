import { useState, useCallback, useEffect } from "react";
import Groq from "groq-sdk";
import type { ChatCompletionMessage } from "@/models";
import { useGroqKey } from "./use-groq-key";

interface UseGroqChatCompletionProps {
	onResponse: (response: string) => void;
}

const useGroqChatCompletion = (
	opts: UseGroqChatCompletionProps | undefined = undefined,
) => {
	const { onResponse } = opts || {};
	const { key } = useGroqKey();
	const [response, setResponse] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [triggerEndOfCompletion, setTriggerEndOfCompletion] =
		useState<boolean>(false);

	const groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });

	const fetchChatCompletion = useCallback(
		async (messages: ChatCompletionMessage[]) => {
			setResponse("");
			setIsLoading(true);

			try {
				const chatCompletion = await groq.chat.completions.create({
					messages: messages.map(({ id, ...message }) => message),
					model: "llama3-8b-8192",
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
		[groq],
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

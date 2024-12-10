import { useState, useCallback } from "react";
import Groq from "groq-sdk";
import type { ChatCompletionMessage } from "@/models";
import { useGroqKey } from "./use-groq-key";

const useGroqChatCompletion = () => {
	const { key } = useGroqKey();
	const [response, setResponse] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });

	const fetchChatCompletion = useCallback(
		async (messages: ChatCompletionMessage[]) => {
			setResponse("");
			setIsLoading(true);

			try {
				const chatCompletion = await groq.chat.completions.create({
					messages,
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
			} catch (error) {
				console.error("Error fetching chat completion:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[groq],
	);

	return { response, isLoading, fetchChatCompletion };
};

export default useGroqChatCompletion;

import { useState, useCallback, useEffect, useMemo } from "react";
import Groq from "groq-sdk";
import type { ChatCompletionMessage } from "@/models";
import { useSettings } from "@/providers/settings-provider";
import { toast } from "sonner";
import { errorDescription } from "@/lib/utils";
import { type GroqUsage, GroqUsageSchema } from "@/models/completion";

interface UseGroqChatCompletionProps {
	onResponse?: (response: string) => void;
}

const useGroqChatCompletion = (
	opts: UseGroqChatCompletionProps | undefined = undefined,
) => {
	const { onResponse } = opts || {};
	const { apiKey, currentModel } = useSettings();
	const [response, setResponse] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [usage, setUsage] = useState<GroqUsage | null>(null);
	const [triggerEndOfCompletion, setTriggerEndOfCompletion] =
		useState<boolean>(false);

	const groq = useMemo(() => {
		return new Groq({ apiKey, dangerouslyAllowBrowser: true });
	}, [apiKey]);

	const fetchChatCompletion = useCallback(
		async (messages: ChatCompletionMessage[]) => {
			setResponse("");
			setIsLoading(true);

			// biome-ignore lint/suspicious/noExplicitAny: Usage not included in sdk
			const readUsage = (usage?: any) => {
				if (usage) {
					setUsage(GroqUsageSchema.parse(usage));
				}
			};

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
					if (
						chunk.choices[0]?.finish_reason === "stop" ||
						chunk.choices[0]?.finish_reason === "length"
					) {
						readUsage(chunk.x_groq?.usage);
					}
				}
				setTriggerEndOfCompletion(true);
			} catch (error) {
				console.error("Error fetching chat completion:");
				console.log(error);
				toast.error("Completion failed", {
					description: errorDescription(error),
				});
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

	return { response, isLoading, fetchChatCompletion, usage };
};

export default useGroqChatCompletion;

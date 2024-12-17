import { useCallback, useEffect, useMemo } from "react";
import { Groq } from "groq-sdk";
import { useSettings } from "@/providers/settings-provider";
import type { ChatCompletionMessage } from "@/models";
import { useGroqModels } from "./use-groq-models";
import { toast } from "sonner";

export function useGroq() {
	const { apiKey, currentModel, setCurrentModel } = useSettings();
	const { models } = useGroqModels();
	const { getContextWindow } = useGroqModels();

	const groq = useMemo(() => {
		return new Groq({ apiKey, dangerouslyAllowBrowser: true });
	}, [apiKey]);

	const params = useCallback(() => {
		return {
			model: currentModel,
			temperature: 1,
			max_tokens: Math.round(getContextWindow(currentModel) * 0.9),
			top_p: 1,
			stop: null,
		};
	}, [currentModel, getContextWindow]);

	const streamChatCompletion = useCallback(
		async function* (messages: ChatCompletionMessage[]) {
			let accumulatedContent = "";

			const completion = await groq.chat.completions.create({
				messages: messages.map(({ id, ...message }) => message),
				stream: true,
				...params(),
			});

			for await (const chunk of completion) {
				const partialContent = chunk.choices[0]?.delta?.content || "";
				accumulatedContent += partialContent;
				if (
					chunk.choices[0]?.finish_reason === "stop" ||
					chunk.choices[0]?.finish_reason === "length"
				) {
					// Last chunk: yield the full accumulated content and the usage data
					yield {
						content: accumulatedContent,
						usage: chunk.x_groq?.usage,
					};
				} else {
					// Yield each partial chunk as it arrives
					yield { content: accumulatedContent };
				}
			}
		},
		[groq, params],
	);

	const chatCompletion = useCallback(
		async (messages: ChatCompletionMessage[]) => {
			const completion = await groq.chat.completions.create({
				messages: messages.map(({ id, ...message }) => message),
				...params(),
			});

			const response = completion.choices[0]?.message.content;
			const usage = completion.usage;

			return { response, usage };
		},
		[groq, params],
	);

	useEffect(() => {
		if (!models || !currentModel) {
			return;
		}

		const model = models.find((m) => m.id === currentModel);
		if (!model) {
			setCurrentModel(models[0].id);
			toast.error(`Model was changed to: ${models[0].id}`);
		}
	}, [models, currentModel, setCurrentModel]);

	return { streamChatCompletion, chatCompletion };
}

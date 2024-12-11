export interface ChatCompletionMessage {
	role: "user" | "assistant" | "system";
	content: string;
	id?: string;
}

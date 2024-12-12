import z from "zod";

export const GroqUsageSchema = z.object({
	completion_tokens: z.number(), // tokens out
	prompt_tokens: z.number(), // tokens in
	total_tokens: z.number(), // tokens total
	completion_time: z.number(), // inference out
	prompt_time: z.number(), // inference in
	total_time: z.number(), // inference total
});

export type GroqUsage = z.infer<typeof GroqUsageSchema>;
export interface APICallStats extends GroqUsage {
	roundTripStart: number;
	roundTripEnd: number;
	model: string;
	latency: number;
	tokenCount: number;
	tokensPerSecond: number;
}

export const GroqCompletionErrorSchema = z.object({
	error: z.object({
		code: z.string(),
		message: z.string(),
		failed_generation: z.string(),
		type: z.string(),
	}),
});

export type GroqCompletionError = z.infer<typeof GroqCompletionErrorSchema>;

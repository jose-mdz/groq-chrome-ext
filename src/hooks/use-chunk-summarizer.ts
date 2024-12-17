import { useState, useCallback } from "react";
import { useGroq } from "./use-groq";
import { useSettings } from "@/providers/settings-provider";
import { chunkText } from "@/lib/utils";

interface Stats {
	chunks: number;
	chunksCompleted: number;
}
// React Hook for summarizing large texts
export function useChunkSummarizer(chunkTokenLimit = 3000) {
	const { chatCompletion } = useGroq();
	const { summarizePrompt } = useSettings();
	const [summary, setSummary] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [stats, setStats] = useState<Stats>({
		chunks: 0,
		chunksCompleted: 0,
	});

	// Function to summarize a chunk using the LLM
	const summarizeChunk = useCallback(
		async function summarizeChunk(
			chunk: string,
			prompt: string,
		): Promise<string> {
			const { response } = await chatCompletion([
				{ role: "system", content: chunk },
				{ role: "user", content: prompt },
			]);

			setStats((prevStats) => ({
				...prevStats,
				chunksCompleted: prevStats.chunksCompleted + 1,
			}));
			return response || "";
		},
		[chatCompletion],
	);

	const recursiveSummarize = useCallback(
		async (text: string, combining = false): Promise<string> => {
			const chunks = chunkText(text, chunkTokenLimit);
			setStats((prevStats) => ({
				...prevStats,
				chunks: chunks.length,
			}));
			const chunkSummaries = await Promise.all(
				chunks.map((chunk) =>
					summarizeChunk(
						chunk,
						combining ? "Summarize the text" : summarizePrompt,
					),
				),
			);

			const combinedSummary = chunkSummaries.join("\n");

			if (combinedSummary.split(" ").length > chunkTokenLimit) {
				return recursiveSummarize(combinedSummary, true);
			}

			return combinedSummary;
		},
		[chunkTokenLimit, summarizeChunk, summarizePrompt],
	);

	const summarize = useCallback(
		async (text: string) => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await recursiveSummarize(text);
				setSummary(result);
				setStats((prevStats) => ({
					...prevStats,
					chunksCompleted: prevStats.chunksCompleted + 1,
				}));
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unexpected error occurred.",
				);
			} finally {
				setIsLoading(false);
			}
		},
		[recursiveSummarize],
	);

	return { summary, isLoading, error, summarize, stats };
}

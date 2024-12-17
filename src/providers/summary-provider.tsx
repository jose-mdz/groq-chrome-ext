import { countWords } from "@/lib/utils";
import { providerFactory } from "./provider-factory";
import { useTextSummary } from "@/hooks/use-text-summary";
import { useBrowserTab } from "@/hooks/use-chrome-tab";
import { useState, useEffect } from "react";
import { useChunkSummarizer } from "@/hooks/use-chunk-summarizer";

const [SummaryProvider, useSummary] = providerFactory(() => {
	const { pageText, selectionText } = useBrowserTab();
	const [pageTokens, setPageTokens] = useState(0);
	const [selectionTokens, setSelectionTokens] = useState(0);
	const [summarySource, setSummarySource] = useState("");
	const {
		summary: textSummary,
		isLoading,
		clearSummary: clearGroqSummary,
		summarize: textSummarize,
		usage,
		retrySummary,
	} = useTextSummary(summarySource);

	const {
		summarize: chunkSummarize,
		summary: chunkSummary,
		stats,
	} = useChunkSummarizer();

	const useChunking = false;
	const summarize = useChunking ? chunkSummarize : textSummarize;
	const summary = useChunking ? chunkSummary : textSummary;

	const clearSummary = () => {
		setSummarySource("");
		clearGroqSummary();
	};

	useEffect(() => {
		if (summarySource) {
			summarize(summarySource);
		}
	}, [summarySource, summarize]);

	useEffect(() => {
		countWords(pageText).then(setPageTokens);
		countWords(selectionText).then(setSelectionTokens);
	}, [pageText, selectionText]);

	return {
		pageTokens,
		selectionTokens,
		summarySource,
		setSummarySource,
		summary,
		isLoading,
		pageText,
		selectionText,
		clearSummary,
		retrySummary,
		usage,
		stats,
		summarize,
	};
});

export { SummaryProvider, useSummary };

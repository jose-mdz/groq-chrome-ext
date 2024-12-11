import { countWords } from "@/lib/utils";
import { providerFactory } from "./provider-factory";
import { useGroqSummary } from "@/hooks/use-groq-summary";
import { useBrowserTab } from "@/hooks/use-chrome-tab";
import { useState, useEffect } from "react";

const [SummaryProvider, useSummary] = providerFactory(() => {
	const { pageText, selectionText } = useBrowserTab();
	const [pageTokens, setPageTokens] = useState(0);
	const [selectionTokens, setSelectionTokens] = useState(0);
	const [summarySource, setSummarySource] = useState("");
	const {
		summary,
		isLoading,
		clearSummary: clearGroqSummary,
		retrySummary,
	} = useGroqSummary(summarySource);

	const clearSummary = () => {
		setSummarySource("");
		clearGroqSummary();
	};

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
	};
});

export { SummaryProvider, useSummary };

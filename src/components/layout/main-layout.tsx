import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { useState } from "react";

export function MainLayout() {
	const [summary, setSummary] = useState("");
	const [loading, setLoading] = useState(false);

	const summarizePage = async () => {
		setLoading(true);
		try {
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});
			const results = await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => window.__PAGE_TEXT_CONTENT__ || "",
			});

			const pageText = results[0]?.result || "";
			// Naive summary: first 3 sentences
			const sentences = pageText
				.split(".")
				.map((s) => s.trim())
				.filter(Boolean);
			const summaryText =
				sentences.slice(0, 3).join(". ") + (sentences.length > 3 ? "..." : "");
			setSummary(summaryText || "No text found.");
		} catch (e) {
			console.error("Error summarizing:", e);
			setSummary("An error occurred.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="text-sm space-y-4 p-3 min-h-[200px]">
			<h3 className="text-lg font-bold">Summarize</h3>
			<Button onClick={summarizePage}>
				{loading ? "Summarizing..." : "Summarize Current Page"}
			</Button>
			<div className="whitespace-pre-wrap">{summary}</div>
			<ModeToggle />
		</div>
	);
}

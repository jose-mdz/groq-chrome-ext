import React, { useState } from "react";

export default function App() {
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
		<div className="text-sm text-gray-800 space-y-4">
			<h3 className="text-lg font-bold">Page Summariess</h3>
			<button
				type="button"
				onClick={summarizePage}
				className="bg-green-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
			>
				{loading ? "Summarizing..." : "Summarize Current Page"}
			</button>
			<div className="whitespace-pre-wrap">{summary}</div>
		</div>
	);
}

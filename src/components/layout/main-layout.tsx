import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { useState } from "react";

export function MainLayout() {
	const [summary, setSummary] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<[string, string]>(["", ""]);

	const summarizePage = async () => {
		setLoading(true);
		try {
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});
			const results = await chrome.scripting.executeScript({
				target: { tabId: tab.id || 0 },
				func: () => [
					window.document.body.innerText || "",
					window.document.getSelection()?.toString() || "",
				],
			});

			const [pageText, selectionText] = results[0]?.result || [];
			setData([pageText, selectionText]);
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
			<div>
				<div className="flex gap-3">
					<div>Page Text</div>
					<div>{data[0].length}</div>
				</div>
				<div className="flex gap-3">
					<div>Selection Text</div>
					<div>{data[1].length}</div>
				</div>
			</div>
			<div className="whitespace-pre-wrap">{summary}</div>
			<ModeToggle />
		</div>
	);
}

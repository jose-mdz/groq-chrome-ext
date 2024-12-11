import { useState, useEffect } from "react";
import { testDocument, testSelection } from "@/test/test-data";
export function useBrowserTab() {
	const [pageText, setPageText] = useState("");
	const [selectionText, setSelectionText] = useState("");

	useEffect(() => {
		(async () => {
			if (!chrome.tabs) {
				setPageText(testDocument);
				setSelectionText(testSelection);
				return;
			}
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
				setPageText(pageText);
				setSelectionText(selectionText);
			} catch (e) {
				console.error("Error retreving tab text:", e);
			}
		})();
	}, []);

	return { pageText, selectionText };
}

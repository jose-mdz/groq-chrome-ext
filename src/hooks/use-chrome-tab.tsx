import { useState, useEffect } from "react";

export function useBrowserTab() {
	const [pageText, setPageText] = useState("");
	const [selectionText, setSelectionText] = useState("");

	useEffect(() => {
		(async () => {
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
				setPageText("a b c d e f");
				setSelectionText("b c");
			}
		})();
	}, []);

	return { pageText, selectionText };
}

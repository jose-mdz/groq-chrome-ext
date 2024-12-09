document
	.getElementById("summarizeButton")
	.addEventListener("click", async () => {
		try {
			// Get active tab
			let [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});

			// Execute a function in the content script to fetch the text
			const results = await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => {
					return window.__PAGE_TEXT_CONTENT__ || "";
				},
			});

			const pageText = results[0].result || "";

			// Naive summary logic:
			// 1. Split text into sentences.
			// 2. Pick the first few sentences as the "summary".
			// Note: For a real summary, integrate a summarization algorithm or API.
			const sentences = pageText
				.split(".")
				.map((s) => s.trim())
				.filter((s) => s);
			const summarySentences =
				sentences.slice(0, 3).join(". ") + (sentences.length > 3 ? "..." : "");

			document.getElementById("summary").innerText =
				summarySentences || "No text found.";
		} catch (error) {
			console.error("Error summarizing:", error);
			document.getElementById("summary").innerText = "An error occurred.";
		}
	});

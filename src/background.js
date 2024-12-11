// Not strictly required for this simple example, but useful if we need background tasks.
// Currently empty, but the presence of a background file is often a good starting point.
chrome.runtime.onInstalled.addListener(() => {
	console.log("Summarizer installed.");
});

// This script runs on every page.
// It extracts the visible text content of the page.
(function () {
	// Extract visible text from the body
	const bodyText = document.body.innerText || "";
	// Store text on the window object so we can request it from popup
	window.__PAGE_TEXT_CONTENT__ = bodyText;
})();

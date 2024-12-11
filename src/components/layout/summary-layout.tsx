import { useBrowserTab } from "@/hooks/use-chrome-tab";
import { Button } from "../ui/button";
import { cn, countWords, formatNumber } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Zap, PanelTop, TextSelect, Lightbulb } from "lucide-react";
import { useGroqSummary } from "@/hooks/use-groq-summary";
import { ContentBlock } from "../content-block";
export function SummaryLayout() {
	const { pageText, selectionText } = useBrowserTab();
	const [pageTokens, setPageTokens] = useState(0);
	const [selectionTokens, setSelectionTokens] = useState(0);
	const [searchText, setSearchText] = useState("");
	const { summary, isLoading } = useGroqSummary(searchText);

	useEffect(() => {
		countWords(pageText).then(setPageTokens);
		countWords(selectionText).then(setSelectionTokens);
	}, [pageText, selectionText]);

	return (
		<div className="bg-background m-2 p-4 rounded-lg">
			<h3 className="font-montserrat flex  gap-2 justify-center w-full items-center pb-3">
				<Zap size={16} />
				<span>Summarize</span>
			</h3>
			<div>
				<div className="flex gap-2">
					<Button
						className={cn(" text-xs flex-1 flex flex-col gap-2 h-auto p-3")}
						variant={"secondary"}
						onClick={() => setSearchText(pageText)}
					>
						<PanelTop size={16} />
						Page {selectionText && <br />} Summary
					</Button>
					{selectionText && (
						<Button
							className="w-1/2 text-xs flex flex-col gap-2 h-auto p-3"
							variant={"secondary"}
							onClick={() => setSearchText(selectionText)}
						>
							<TextSelect size={16} />
							Selection <br /> Summary
						</Button>
					)}
				</div>
				{pageTokens && (
					<div className="flex text-xs opacity-30">
						<div className="flex-1 text-center">
							{formatNumber(pageTokens)} word{pageTokens > 1 ? "s" : ""}
						</div>
						{selectionText && (
							<div className="w-1/2 text-center">
								{formatNumber(selectionTokens)} word
								{selectionTokens > 1 ? "s" : ""}
							</div>
						)}
					</div>
				)}
			</div>
			{!summary && !selectionText && (
				<div className="pt-6 text-xs opacity-70">
					<div className="flex gap-2 items-center">
						<Lightbulb size={16} className="shrink-0" />
						<span>
							You can also select text to have an option to summarize the
							selected text.
						</span>
					</div>
				</div>
			)}
			{summary && <ContentBlock content={summary} className="mt-6" />}
		</div>
	);
}

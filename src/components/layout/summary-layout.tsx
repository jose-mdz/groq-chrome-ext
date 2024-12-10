import { useBrowserTab } from "@/hooks/use-chrome-tab";
import { Button } from "../ui/button";
import { cn, countWords, formatNumber } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
export function SummaryLayout() {
	const { pageText, selectionText } = useBrowserTab();
	const [pageTokens, setPageTokens] = useState(0);
	const [selectionTokens, setSelectionTokens] = useState(0);

	useEffect(() => {
		countWords(pageText).then(setPageTokens);
		countWords(selectionText).then(setSelectionTokens);
	}, [pageText, selectionText]);

	return (
		<div className="bg-background m-2 p-2 rounded-lg">
			<h3 className="font-montserrat flex  gap-2 justify-center w-full items-center pb-3">
				<Zap size={16} />
				<span>Summarize</span>
			</h3>
			<div>
				<div className="flex">
					<Button
						className={cn(
							" text-xs flex-1",
							selectionText && "rounded-r-none border-r-0",
						)}
						variant={"outline"}
					>
						Page Summary
					</Button>
					{selectionText && (
						<Button
							className="w-1/2 rounded-l-none text-xs"
							variant={"outline"}
						>
							Selection Summary
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
			<div className="pt-10 text-xs">
				You can also select text to have an option to summarize the selected
				text.
			</div>
		</div>
	);
}

import { useBrowserTab } from "@/hooks/use-chrome-tab";
import { Button } from "../ui/button";
import { cn, countTokens, formatNumber } from "@/lib/utils";
import { useState, useEffect } from "react";

export function SummaryLayout() {
	const { pageText, selectionText } = useBrowserTab();
	const [pageTokens, setPageTokens] = useState(0);
	const [selectionTokens, setSelectionTokens] = useState(0);

	useEffect(() => {
		countTokens(pageText).then(setPageTokens);
		countTokens(selectionText).then(setSelectionTokens);
	}, [pageText, selectionText]);

	return (
		<>
			<h3 className=" text-center font-montserrat">Summarize</h3>
			<div>
				<div className="flex">
					<Button
						className={cn(
							" text-xs flex-1",
							selectionText && "rounded-r-none border-r-0",
						)}
						variant={"outline"}
					>
						Page
					</Button>
					{selectionText && (
						<Button
							className="w-1/2 rounded-l-none text-xs"
							variant={"outline"}
						>
							Selection
						</Button>
					)}
				</div>
				{pageTokens && (
					<div className="flex text-xs opacity-50">
						<div className="flex-1 text-center">
							{formatNumber(pageTokens)} tokens
						</div>
						{selectionText && (
							<div className="w-1/2 text-center">
								{formatNumber(selectionTokens)} tokens
							</div>
						)}
					</div>
				)}
			</div>
			<div>
				<div className="flex gap-3">
					<div>Page Text</div>
					<div>{pageText.length}</div>
				</div>
				<div className="flex gap-3">
					<div>Selection Text</div>
					<div>{selectionText.length}</div>
				</div>
			</div>
		</>
	);
}

import { Button } from "../ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { Zap, PanelTop, TextSelect, Lightbulb, RefreshCcw } from "lucide-react";
import { ContentBlock } from "../content-block";
import { useSummary } from "@/providers/summary-provider";

export function SummaryLayout() {
	const {
		isLoading,
		summary,
		pageTokens,
		selectionTokens,
		pageText,
		selectionText,
		summarySource,
		setSummarySource,
		clearSummary,
		retrySummary,
	} = useSummary();

	return (
		<div className="bg-background m-2 p-4 rounded-lg">
			<h3 className="font-montserrat flex  gap-2 justify-center w-full items-center pb-3">
				<Zap size={16} />
				<span>Summarize</span>
			</h3>
			<div className={cn("relative invisible", isLoading && "visible")}>
				<div
					className={cn(
						"absolute top-0 left-0 h-[2px] bg-[#f55036] animate-loader",
					)}
				/>
			</div>
			<div>
				<div className="flex gap-2">
					<Button
						className={cn(
							" text-xs flex-1 flex flex-col gap-2 h-auto p-3",
							summarySource === pageText && "opacity-30",
						)}
						variant={"secondary"}
						onClick={() => setSummarySource(pageText)}
					>
						<PanelTop size={16} />
						Page {selectionText && <br />} Summary
					</Button>
					{selectionText && (
						<Button
							className={cn(
								"w-1/2 text-xs flex flex-col gap-2 h-auto p-3",
								summarySource === selectionText && "opacity-30",
							)}
							variant={"secondary"}
							onClick={() => setSummarySource(selectionText)}
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
			{summary && (
				<>
					<ContentBlock content={summary} className="mt-6" />
					<div className="flex justify-between mt-2 ">
						<Button
							size={"sm"}
							variant={"outline"}
							className="text-xs  opacity-50 hover:opacity-100"
							onClick={retrySummary}
						>
							<RefreshCcw size={16} />
						</Button>
						<Button
							size={"sm"}
							variant={"outline"}
							className="text-xs  opacity-50 hover:opacity-100"
							onClick={clearSummary}
						>
							Clear
						</Button>
					</div>
				</>
			)}
		</div>
	);
}

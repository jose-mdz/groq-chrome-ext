import { Button } from "@/components/ui/button";
import { cn, formatNumber, formatTime } from "@/lib/utils";
import { Zap, PanelTop, TextSelect, Lightbulb, RefreshCcw } from "lucide-react";
import { useSummary } from "@/providers/summary-provider";
import { ContentBlock } from "@/components/shelf/content-block";

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
		usage,
	} = useSummary();

	console.log(usage);

	return (
		<div className="bg-background m-2 p-4 rounded-lg">
			<h3 className="relative font-montserrat text-lg flex  gap-2 justify-center w-full items-center pt-3 pb-10">
				<Zap size={16} />
				<span>Summarize</span>
				<div className="absolute bottom-[25px] left-[50%] text-xs opacity-30">
					with groq
				</div>
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
							" text-sm flex-1 flex flex-col gap-2 h-auto p-3",
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
								"w-1/2 text-sm flex flex-col gap-2 h-auto p-3",
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
				<div className="pt-10 opacity-70">
					<div className="flex gap-2 items-center">
						<Lightbulb size={16} className="shrink-0" />
						<span>
							You can also <span className="bg-blue-700">select text</span> to
							have an option to summarize the selected text.
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
							variant={"ghost"}
							className="text-xs  opacity-30 hover:opacity-100"
							onClick={retrySummary}
						>
							<RefreshCcw size={16} />
						</Button>
						{usage && (
							<div className="text-xs flex gap-3 items-center opacity-30">
								<div className="">{formatTime(usage.total_time)} </div>
								<Zap size={16} className="text-[#f55036]" />
								<div className="">
									{formatNumber(
										usage.completion_tokens / usage.completion_time,
									)}{" "}
									T/s
								</div>
							</div>
						)}
						<Button
							size={"sm"}
							variant={"ghost"}
							className="text-xs  opacity-30 hover:opacity-100"
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

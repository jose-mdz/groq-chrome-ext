import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft, Copy, Check, ALargeSmall } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { MarkdownBlock } from "./markdown-block";
export function ContentBlock({
	content,
	noControls,
	className,
}: {
	content: string;
	className?: string;
	noControls?: boolean;
}) {
	const [isPlainText, setIsPlainText] = useState(false);
	const { isCopied, copyToClipboard } = useCopyToClipboard({});
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			{!noControls && (
				<div className="flex justify-between gap-2">
					<div className="flex">
						<Button
							className={cn("rounded-r-none", !isPlainText && "opacity-50")}
							variant={"secondary"}
							size={"icon"}
							onClick={() => setIsPlainText(true)}
						>
							<AlignLeft size={16} />
						</Button>
						<Button
							className={cn("rounded-l-none", isPlainText && "opacity-50")}
							variant={"secondary"}
							size={"icon"}
							onClick={() => setIsPlainText(false)}
						>
							<ALargeSmall size={16} />
						</Button>
					</div>
					<div className="flex gap-2">
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() => copyToClipboard(content)}
						>
							{isCopied ? <Check size={16} /> : <Copy size={16} />}
						</Button>
					</div>
				</div>
			)}
			<div
				className={cn(
					"bg-secondary rounded-lg px-4 py-1 text-sm overflow-scroll",
					noControls && "pb-1",
				)}
			>
				{isPlainText ? (
					<div className={cn("whitespace-pre-wrap py-3")}>{content}</div>
				) : (
					<MarkdownBlock>{content}</MarkdownBlock>
				)}
			</div>
		</div>
	);
}

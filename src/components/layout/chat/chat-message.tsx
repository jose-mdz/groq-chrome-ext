import { ContentBlock } from "@/components/content-block";
import { cn } from "@/lib/utils";
import type { ChatCompletionMessage } from "@/models";
import { useSummary } from "@/providers/summary-provider";

export function ChatMessage({
	message,
	className,
}: {
	message: ChatCompletionMessage;
	className?: string;
}) {
	const { role, content } = message;
	return (
		<div
			className={cn(
				"flex flex-col gap-2",
				role === "user" && "justify-end items-end",
				className,
			)}
		>
			<div className={cn("text-sm text-muted-foreground capitalize")}>
				{role === "user" ? "you" : role}
			</div>
			<ContentBlock
				content={content}
				noControls={role === "user"}
				className="max-w-[90%]"
			/>
		</div>
	);
}

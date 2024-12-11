import { cn } from "@/lib/utils";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { AlignLeft, TypeOutline, Copy, Check } from "lucide-react";
import remarkGfm from "remark-gfm";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
export function ContentBlock({
	content,
	className,
}: {
	content: string;
	className?: string;
}) {
	const [isPlainText, setIsPlainText] = useState(false);
	const { isCopied, copyToClipboard } = useCopyToClipboard({});
	return (
		<div className={cn("flex flex-col gap-2", className)}>
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
						<TypeOutline size={16} />
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
			<div
				className={cn(
					"bg-secondary rounded-lg p-4 pt-1 text-sm overflow-scroll",
				)}
			>
				{isPlainText ? (
					<div className={cn("whitespace-pre-wrap")}>{content}</div>
				) : (
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							h1: ({ children }) => (
								<h1 className="text-xl font-bold my-3">{children}</h1>
							),
							h2: ({ children }) => (
								<h2 className="text-lg my-3">{children}</h2>
							),
							h3: ({ children }) => (
								<h3 className="text-bold my-3">{children}</h3>
							),
							p: ({ children }) => <p className="my-3">{children}</p>,
						}}
					>
						{content}
					</ReactMarkdown>
				)}
			</div>
		</div>
	);
}

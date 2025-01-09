import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";

export function MarkdownBlock({
	children,
}: { children: string | null | undefined }) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code: ({ children, ...rest }) => (
					<CodeBlock content={children} {...rest} />
				),
				h1: ({ children }) => (
					<h1 className="text-xl font-bold my-3">{children}</h1>
				),
				h2: ({ children }) => <h2 className="text-lg my-3">{children}</h2>,
				h3: ({ children }) => <h3 className="text-bold my-3">{children}</h3>,
				p: ({ children }) => <div className="my-3">{children}</div>,
				ul: ({ children }) => <ul className="list-disc py-2">{children}</ul>,
				ol: ({ children }) => (
					<ul className="list-decimal py-2 ">{children}</ul>
				),
				li: ({ children }) => <li className="ml-6 py-1">{children}</li>,
			}}
		>
			{children}
		</ReactMarkdown>
	);
}

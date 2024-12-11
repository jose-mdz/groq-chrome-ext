import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function CodeBlock({ content }: { content: string }) {
	return (
		<Prism language="python" style={vscDarkPlus}>
			{content}
		</Prism>
	);
}

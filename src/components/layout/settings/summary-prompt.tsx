import TextareaAutosize from "@/components/shelf/textarea-autosize";
import { useSettings } from "@/providers/settings-provider";

export function SummaryPrompt() {
	const { summarizePrompt, setSummarizePrompt } = useSettings();
	return (
		<div>
			<TextareaAutosize
				value={summarizePrompt}
				onChange={(e) => setSummarizePrompt(e.target.value)}
			/>
		</div>
	);
}

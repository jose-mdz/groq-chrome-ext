import { Slider } from "@/components/ui/slider";
import { useGroqModels } from "@/hooks/use-groq-models";
import { formatNumber } from "@/lib/utils";
import { useSettings } from "@/providers/settings-provider";

declare global {
	namespace Groq {
		namespace Models {
			interface Model {
				context_window: number;
			}
		}
	}
}

export function TruncateSlider() {
	const { currentModel, chunkWordLimit, setChunkWordLimit } = useSettings();
	const { models = [], getContextWindow } = useGroqModels();

	if (models.length === 0) return null;

	const model = models.find((model) => model.id === currentModel);

	if (!model) return null;

	const contextWindow = getContextWindow(currentModel);

	return (
		<>
			<div className="flex flex-row gap-2 justify-end text-sm">
				{formatNumber(Number.parseInt(chunkWordLimit))} words
			</div>
			<Slider
				value={[Number.parseInt(chunkWordLimit)]}
				min={100}
				max={Math.round(contextWindow * 0.9)}
				onValueChange={(value) => setChunkWordLimit(value[0].toString())}
			/>
			<div className="flex flex-col gap-1 text-sm opacity-30 mt-4">
				<div className="flex flex-row gap-2">
					<div className="w-32">Model:</div>
					<div>{currentModel}</div>
				</div>
				<div className="flex flex-row gap-2">
					<div className="w-32">Context window:</div>
					<div>{formatNumber(contextWindow)} tokens</div>
				</div>
			</div>
		</>
	);
}

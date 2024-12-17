import { useGroqModels } from "@/hooks/use-groq-models";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";
import { useEffect } from "react";

export function ModelsCombo() {
	const { models = [], isLoading } = useGroqModels();
	const { currentModel, setCurrentModel } = useSettings();

	// If the current model is not in the list of models, set the current model to the first model in the list
	useEffect(() => {
		if (
			models.length > 0 &&
			!models.filter((model) => model.id === currentModel).length
		) {
			setCurrentModel(models[0].id);
		}
	}, [models, currentModel, setCurrentModel]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-full flex justify-between">
					{currentModel}
					{isLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<ChevronDown className="w-4 h-4" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-h-[300px] overflow-y-auto ">
				{models.map((model) => (
					<DropdownMenuItem
						key={model.id}
						onClick={() => setCurrentModel(model.id)}
					>
						{model.id}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

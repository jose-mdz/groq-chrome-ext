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

export function ModelsCombo() {
	const { models, isLoading, reloadModels } = useGroqModels();
	const { currentModel, setCurrentModel } = useSettings();

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
			<DropdownMenuContent className="max-h-[200px] overflow-y-auto ">
				{models.map((model) => (
					<DropdownMenuItem key={model} onClick={() => setCurrentModel(model)}>
						{model}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

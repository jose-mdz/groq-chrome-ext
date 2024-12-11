import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/providers/settings-provider";
import { ChevronDown } from "lucide-react";

export function SettingsLayout() {
	const { currentModel, setApiKey } = useSettings();
	return (
		<div className="m-2 p-3 bg-background rounded-lg flex flex-col gap-6">
			<h1 className="font-montserrat">Settings</h1>

			<Separator />
			<div className="flex flex-col gap-2">
				<h2 className="font-montserrat">Model</h2>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="w-full flex justify-between">
							{currentModel}
							<ChevronDown className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Model 1</DropdownMenuItem>
						<DropdownMenuItem>Model 2</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Separator />
			<div className="flex flex-col gap-2">
				If you want to use a different API key, delete the current key.
				<Button variant="destructive" onClick={() => setApiKey("")}>
					Delete API Key
				</Button>
			</div>
		</div>
	);
}

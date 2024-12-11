import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useSettings } from "@/providers/settings-provider";

export function DeleteKeyButton() {
	const { setApiKey } = useSettings();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Delete API Key</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete API Key</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Are you sure you want to delete the API key?
				</DialogDescription>
				<DialogFooter>
					<Button variant="destructive" onClick={() => setApiKey("")}>
						Delete API Key
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

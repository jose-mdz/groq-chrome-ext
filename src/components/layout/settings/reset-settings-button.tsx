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
import { useAppNav } from "@/providers/app-nav";
import { useSettings } from "@/providers/settings-provider";
import { useState } from "react";

export function ResetAllSettingsButton() {
	const { resetAllSettings } = useSettings();
	const { closeSettings } = useAppNav();
	const [open, setOpen] = useState(false);

	const handleReset = () => {
		resetAllSettings();
		closeSettings();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Reset All Settings</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Reset All Settings</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Are you sure you want to reset all settings?
				</DialogDescription>
				<DialogFooter>
					<Button variant="destructive" onClick={handleReset}>
						Reset All Settings
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

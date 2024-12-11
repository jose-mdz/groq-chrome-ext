import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/providers/settings-provider";
import { ModelsCombo } from "./models-combo";
import { X } from "lucide-react";
import { useAppNav } from "@/providers/app-nav";
import { SummaryPrompt } from "./summary-prompt";
import { DeleteKeyButton } from "./delete-key-button";

export function SettingsLayout() {
	const { setApiKey } = useSettings();
	const { closeSettings } = useAppNav();
	return (
		<div className="m-2 p-3 bg-background rounded-lg flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h1 className="font-montserrat text-xl">Settings</h1>
				<Button variant="ghost" size="icon" onClick={closeSettings}>
					<X className="w-4 h-4" />
				</Button>
			</div>
			<SettingsSection title="Model">
				<ModelsCombo />
			</SettingsSection>
			<SettingsSection title="Summarize Prompt">
				<p>
					You can customize the prompt used to summarize the text. This is
					useful if you want to change the way the summary is generated.
				</p>
				<SummaryPrompt />
			</SettingsSection>
			<SettingsSection title="API Key">
				<p>If you want to use a different API key, delete the current key.</p>
				<DeleteKeyButton />
			</SettingsSection>
		</div>
	);
}

function SettingsSection({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<div className="flex flex-col gap-2">
			<Separator />
			<h2 className="font-montserrat mt-6">{title}</h2>
			<div className="flex flex-col gap-2 [&>p]:text-sm [&>p]:text-muted-foreground">
				{children}
			</div>
		</div>
	);
}

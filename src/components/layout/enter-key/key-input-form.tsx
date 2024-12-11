import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGroqKeyTester } from "@/hooks/use-groq-key-tester";
import { useSettings } from "@/providers/settings-provider";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function KeyInputForm() {
	const { apiKey, setApiKey } = useSettings();
	const { isTesting, testSuccess, testKey } = useGroqKeyTester();
	const [text, setText] = useState(apiKey);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		testKey(text);
	};

	useEffect(() => {
		if (testSuccess === false) {
		} else if (testSuccess === true) {
			setApiKey(text);
			toast.success("API Key saved");
		}
	}, [testSuccess, text, setApiKey]);

	return (
		<form className="" onSubmit={handleSubmit}>
			<div className="flex gap-2">
				<Input
					autoFocus
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Groq API key"
				/>
				<Button type="submit">
					{isTesting ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<ArrowRight className="w-4 h-4" />
					)}
				</Button>
			</div>
			{testSuccess === false && !isTesting && (
				<div className="text-sm text-red-500 py-2">
					The key is invalid. Pease try another one.
				</div>
			)}
		</form>
	);
}

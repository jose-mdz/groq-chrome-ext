import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/providers/settings-provider";
import { ArrowRight, CircleHelp } from "lucide-react";

export function EnterKeyLayout() {
	const { apiKey, setApiKey } = useSettings();
	const [text, setText] = useState(apiKey);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setApiKey(text);
	};

	return (
		<div className="m-2 p-3 bg-background rounded-lg flex flex-col gap-6">
			<h2 className="font-montserrat text-lg">Welcome to Groq Summarizer</h2>
			<div className="flex flex-col gap-2">
				<div className="text-sm opacity-70">
					This extension requires a Groq API Key:
				</div>
				<form className="flex gap-2" onSubmit={handleSubmit}>
					<Input
						autoFocus
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Groq API key"
					/>
					<Button type="submit">
						<ArrowRight className="w-4 h-4" />
					</Button>
				</form>
			</div>
			<Separator />
			<div className="flex gap-3 items-center mt-10">
				<div>
					<CircleHelp className="w-4 h-4" />
				</div>
				<div className="flex flex-col gap-2 text-sm ">
					<h2 className=" font-bold ">Get a free key</h2>
					<p className="opacity-50">
						You can get a free Groq API key from the{" "}
						<a
							href="https://console.groq.com/keys"
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							Groq developer website
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

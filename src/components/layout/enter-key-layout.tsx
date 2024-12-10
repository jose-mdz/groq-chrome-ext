import { useGroqKey } from "@/hooks/use-groq-key";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function EnterKeyLayout() {
	const { key, setKey } = useGroqKey();
	const [text, setText] = useState(key);
	return (
		<div className="m-2 p-3 bg-background rounded-lg flex flex-col gap-6">
			<h2 className="font-montserrat">Enter your Groq API Key</h2>
			<div className="flex flex-col gap-2">
				<div className="text-xs opacity-70">
					This extension requires a Groq API Key:
				</div>
				<Input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Groq API key"
				/>
			</div>
			<Button onClick={() => setKey(text)}>Save</Button>
			<Separator />
			<div className="flex flex-col gap-2 text-xs ">
				<h2 className=" font-bold">How to get your Groq API key</h2>
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
	);
}

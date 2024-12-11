import { Separator } from "@/components/ui/separator";
import { CircleHelp } from "lucide-react";
import { KeyInputForm } from "./key-input-form";

export function EnterKeyLayout() {
	return (
		<div className="m-2 p-3 bg-background rounded-lg flex flex-col gap-6">
			<h2 className="font-montserrat text-lg">Welcome to Groq Summarizer</h2>
			<div className="flex flex-col gap-2">
				<div className="text-sm ">This extension requires a Groq API Key:</div>
				<KeyInputForm />
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
							Groq developer console website.
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

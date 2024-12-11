import { useChromeStorage } from "@/hooks/use-chrome-storage";
import { providerFactory } from "./provider-factory";
import { defaultModel, defaultSummarizePrompt } from "@/lib/defaults";

const [SettingsProvider, useSettings] = providerFactory(() => {
	const [apiKey, setApiKey] = useChromeStorage({
		key: "groq-key",
		defaultValue: "",
	});

	const [summarizePrompt, setSummarizePrompt] = useChromeStorage({
		key: "summarize-prompt",
		defaultValue: defaultSummarizePrompt,
	});

	const [currentModel, setCurrentModel] = useChromeStorage({
		key: "current-model",
		defaultValue: defaultModel,
	});

	return {
		apiKey,
		setApiKey,

		summarizePrompt,
		setSummarizePrompt,

		currentModel,
		setCurrentModel,
	};
});

export { SettingsProvider, useSettings };

import {
	clearChromeStorage,
	useChromeStorage,
} from "@/hooks/use-chrome-storage";
import { providerFactory } from "./provider-factory";
import { defaultModel, defaultSummarizePrompt } from "@/lib/defaults";
import { toast } from "sonner";

const settings = [
	"groq-key",
	"summarize-prompt",
	"current-model",
	"use-chunking",
	"chunk-word-limit",
];
type Setting = (typeof settings)[number];

const [SettingsProvider, useSettings] = providerFactory(() => {
	const [apiKey, setApiKey] = useSetting("groq-key", "");

	const [summarizePrompt, setSummarizePrompt] = useSetting(
		"summarize-prompt",
		defaultSummarizePrompt,
	);

	const [currentModel, setCurrentModel] = useSetting(
		"current-model",
		defaultModel,
	);

	const [useChunking, setUseChunking] = useSetting("use-chunking", "false");

	const [chunkWordLimit, setChunkWordLimit] = useSetting(
		"chunk-word-limit",
		"6000",
	);

	const resetAllSettings = () => {
		for (const setting of settings) {
			clearSetting(setting as Setting);
		}
		setApiKey("");
		toast.success("All settings have been reset to their default values.");
	};

	return {
		apiKey,
		setApiKey,

		summarizePrompt,
		setSummarizePrompt,

		currentModel,
		setCurrentModel,

		useChunking,
		setUseChunking,

		chunkWordLimit,
		setChunkWordLimit,

		resetAllSettings,
	};
});

function useSetting(setting: Setting, defaultValue: string) {
	return useChromeStorage({
		key: setting,
		defaultValue,
	});
}

function clearSetting(setting: Setting) {
	clearChromeStorage(setting);
}

export { SettingsProvider, useSettings };

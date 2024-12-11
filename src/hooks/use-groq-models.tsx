import { useSettings } from "@/providers/settings-provider";
import Groq from "groq-sdk";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useGroqModels() {
	const { apiKey } = useSettings();
	const [models, setModels] = useState<string[]>([]);

	const groq = useMemo(() => {
		return new Groq({ apiKey, dangerouslyAllowBrowser: true });
	}, [apiKey]);

	const [isLoading, setIsLoading] = useState(true);

	const fetchModels = useCallback(async () => {
		if (!apiKey) return;
		setIsLoading(true);
		const models = await groq.models.list();
		setModels(models.data.map((model) => model.id));
		setIsLoading(false);
	}, [groq, apiKey]);

	useEffect(() => {
		fetchModels();
	}, [fetchModels]);

	return {
		models,
		isLoading,
		reloadModels: fetchModels,
	};
}

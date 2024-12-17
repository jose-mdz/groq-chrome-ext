import { modelNamePassesFilter } from "@/lib/utils";
import { useSettings } from "@/providers/settings-provider";
import Groq from "groq-sdk";
import { useCallback, useEffect, useMemo } from "react";
import useSWR, { mutate } from "swr";

export function useGroqModels() {
	const { apiKey } = useSettings();

	const groq = useMemo(() => {
		return new Groq({ apiKey, dangerouslyAllowBrowser: true });
	}, [apiKey]);

	const reloadModels = () => mutate("models");

	const { data: models, isLoading } = useSWR(
		apiKey ? "models" : null,
		async () => {
			if (!apiKey) return;
			const models = await groq.models.list();
			return models.data.filter((model) => modelNamePassesFilter(model.id));
		},
	);

	const getContextWindow = useCallback(
		(model: string) => {
			return (
				(
					models?.find((m) => m.id === model) as Groq.Models.Model & {
						context_window?: number;
					}
				)?.context_window || 8000
			);
		},
		[models],
	);

	useEffect(() => {
		if (!apiKey) return;
		mutate("models");
	}, [apiKey]);

	return {
		models,
		isLoading,
		reloadModels,
		getContextWindow,
	};
}

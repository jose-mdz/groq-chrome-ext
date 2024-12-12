import Groq from "groq-sdk";
import { useCallback, useState } from "react";

export function useGroqKeyTester() {
	const [isTesting, setIsTesting] = useState(false);
	const [testSuccess, setTestSuccess] = useState<boolean | null>(null);

	const testKey = useCallback(async (apiKey: string) => {
		if (!apiKey) return;

		const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

		setIsTesting(true);

		try {
			await groq.models.list();
			setTestSuccess(true);
		} catch (error) {
			setTestSuccess(false);
		}

		setIsTesting(false);
	}, []);

	return {
		isTesting,
		testSuccess,
		testKey,
	};
}

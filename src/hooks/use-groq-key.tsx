import { useChromeStorage } from "./use-chrome-storage";

export function useGroqKey() {
	const [key, setKey] = useChromeStorage({
		key: "groq-key",
		defaultValue: "",
	});

	return { key, setKey };
}

import { useState, useEffect, useCallback } from "react";

declare global {
	namespace chrome.runtime {
		interface LastError {
			message: string;
		}

		const lastError: LastError | null;
	}
}

type UseChromeStorageOptions<T> = {
	key: string;
	defaultValue: T;
	storageArea?: "sync" | "local";
};

export function useChromeStorage<T>({
	key,
	defaultValue,
	storageArea = "local",
}: UseChromeStorageOptions<T>): [T, (newValue: T) => void] {
	const [value, setValue] = useState<T>(defaultValue);

	const isChromeStorageAvailable =
		typeof chrome !== "undefined" && chrome.storage;

	const getValueFromStorage = useCallback(() => {
		if (isChromeStorageAvailable) {
			chrome.storage[storageArea].get(key, (result) => {
				if (chrome.runtime.lastError) {
					console.error(
						`Failed to retrieve ${key}: ${chrome.runtime.lastError.message}`,
					);
					return;
				}
				if (result[key] !== undefined) {
					setValue(result[key]);
				} else {
					setValue(defaultValue);
				}
			});
		} else {
			// Fallback to localStorage
			const storedValue = window.localStorage.getItem(key);
			if (storedValue !== null) {
				setValue(JSON.parse(storedValue));
			} else {
				setValue(defaultValue);
			}
		}
	}, [key, defaultValue, storageArea, isChromeStorageAvailable]);

	const setStoredValue = useCallback(
		(newValue: T) => {
			if (isChromeStorageAvailable) {
				chrome.storage[storageArea].set({ [key]: newValue }, () => {
					if (chrome.runtime.lastError) {
						console.error(
							`Failed to set ${key}: ${chrome.runtime.lastError.message}`,
						);
					} else {
						setValue(newValue);
					}
				});
			} else {
				// Fallback to localStorage
				try {
					window.localStorage.setItem(key, JSON.stringify(newValue));
					setValue(newValue);
				} catch (error) {
					console.error(`Failed to set ${key} in localStorage:`, error);
				}
			}
		},
		[key, storageArea, isChromeStorageAvailable],
	);

	useEffect(() => {
		// Initial load
		getValueFromStorage();

		if (isChromeStorageAvailable) {
			// Listen for external changes to the storage value
			function handleStorageChange(
				changes: { [key: string]: chrome.storage.StorageChange },
				areaName: string,
			) {
				if (areaName === storageArea && changes[key]) {
					setValue(changes[key].newValue ?? defaultValue);
				}
			}

			chrome.storage.onChanged.addListener(handleStorageChange);

			return () => {
				chrome.storage.onChanged.removeListener(handleStorageChange);
			};
		}
	}, [
		key,
		defaultValue,
		storageArea,
		getValueFromStorage,
		isChromeStorageAvailable,
	]);

	return [value, setStoredValue];
}

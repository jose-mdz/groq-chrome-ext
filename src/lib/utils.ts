import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(number: number) {
	return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export async function countWords(text: string): Promise<number> {
	return text.split(/\s+/).length;
}

export function truncateTokens(text: string, maxTokens: number): string {
	return text.slice(0, maxTokens * 4);
}

export function errorDescription(error: unknown): string {
	const data = error instanceof Error ? error.message : "Unknown error";

	try {
		const obj = extractJsonObject(data);
		return obj?.error?.message || data;
	} catch (error) {
		return data;
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function extractJsonObject(input: string): any | null {
	const startIndex = input.indexOf("{");

	if (startIndex === -1) {
		// No opening curly brace found
		return null;
	}

	const stack: string[] = [];
	let jsonString = "";

	for (let i = startIndex; i < input.length; i++) {
		const char = input[i];
		jsonString += char;

		if (char === "{") {
			stack.push(char);
		} else if (char === "}") {
			stack.pop();

			// If stack is empty, we have found the closing brace
			if (stack.length === 0) {
				try {
					return JSON.parse(jsonString);
				} catch (error) {
					// console.error("Invalid JSON:", error);
					return null;
				}
			}
		}
	}

	// If we finish the loop and the stack is not empty, JSON is incomplete
	// console.error("Incomplete JSON structure");
	return null;
}

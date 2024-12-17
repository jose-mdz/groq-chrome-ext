import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(number: number) {
	return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export /**
 * Formats a time given in seconds.
 * If less than a second, it will be displayed in milliseconds with at most 3 digits.
 *
 * @param {number} timeInSeconds - Time in seconds.
 * @returns {string} - Formatted time string.
 */
function formatTime(timeInSeconds: number): string {
	if (timeInSeconds < 1) {
		const milliseconds = timeInSeconds * 1000;
		return `${Math.round(milliseconds)}ms`;
	}
	return `${timeInSeconds.toFixed(1)}sec`;
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

// Function to divide the text into manageable chunks
export function chunkText(text: string, maxTokens: number): string[] {
	const words = text.split(" ");
	const chunks: string[] = [];
	let currentChunk: string[] = [];
	let currentLength = 0;

	for (const word of words) {
		const wordLength = word.length + 1; // Account for the space
		if (currentLength + wordLength > maxTokens) {
			chunks.push(currentChunk.join(" "));
			currentChunk = [word];
			currentLength = wordLength;
		} else {
			currentChunk.push(word);
			currentLength += wordLength;
		}
	}

	if (currentChunk.length > 0) {
		chunks.push(currentChunk.join(" "));
	}

	return chunks;
}

export function modelNamePassesFilter(model: string): boolean {
	return !model.includes("whisper");
}

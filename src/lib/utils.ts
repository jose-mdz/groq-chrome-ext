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

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(number: number) {
	return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export async function countTokens(text: string): Promise<number> {
	return Math.round(text.length / 4);
}

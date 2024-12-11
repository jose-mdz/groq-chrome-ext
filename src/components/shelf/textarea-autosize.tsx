import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { useWindowResize } from "@/hooks/use-window-resize";
import React, { useCallback, useEffect, useRef } from "react";

const TextareaAutosize = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, value, autoFocus, ...props }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null);

		const adjustHeight = useCallback(() => {
			const textarea = textareaRef.current;
			if (textarea) {
				textarea.style.height = "auto";
				if (String(value)) {
					textarea.style.height = `${textarea.scrollHeight}px`;
				}
			}
		}, [value]);

		useWindowResize(adjustHeight);

		useEffect(() => {
			if (value) {
				adjustHeight();
			}
		}, [value, adjustHeight]);

		useEffect(() => {
			if (autoFocus) {
				textareaRef.current?.focus();
			}
		}, [autoFocus]);

		return (
			<Textarea
				ref={(node) => {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(textareaRef as any).current = node;
					if (typeof ref === "function") {
						ref(node);
					} else if (ref) {
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						(ref as any).current = node;
					}
				}}
				className={className}
				value={value}
				{...props}
			/>
		);
	},
);
TextareaAutosize.displayName = "TextareaAutosize";

export default TextareaAutosize;

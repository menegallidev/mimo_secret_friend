"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function formatCPF(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9)
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;

    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
        6,
        9
    )}-${digits.slice(9, 11)}`;
}

export function unformatCPF(value: string) {
    return value.replace(/\D/g, "").slice(0, 11);
}

export type CpfInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (formatted: string, raw: string) => void;
};

export const CpfInput = React.forwardRef<HTMLInputElement, CpfInputProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            className,
            placeholder = "000.000.000-00",
            ...props
        },
        ref
    ) => {
        const isControlled = value !== undefined;

        const [internalValue, setInternalValue] = React.useState<string>(
            formatCPF(defaultValue ?? "")
        );

        React.useEffect(() => {
            if (isControlled) {
                setInternalValue(formatCPF(value ?? ""));
            }
        }, [isControlled, value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = unformatCPF(e.target.value);
            const formatted = formatCPF(raw);

            if (!isControlled) setInternalValue(formatted);

            onValueChange?.(formatted, raw);
        };

        return (
            <Input
                ref={ref}
                inputMode="numeric"
                autoComplete="off"
                placeholder={placeholder}
                value={internalValue}
                onChange={handleChange}
                className={cn(className)}
                {...props}
            />
        );
    }
);

CpfInput.displayName = "CpfInput";

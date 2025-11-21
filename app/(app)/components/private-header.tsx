"use client";

import Link from "next/link";
import { Gift, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function PrivateHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

                <Link href="/dashboard" className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    <span
                        className="text-lg font-extrabold tracking-tight"
                        style={{ fontFamily: "var(--font-mimo-logo)" }}
                    >
                        Mimo
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <ModeToggle />

                    <Button asChild variant="ghost" size="icon" aria-label="Ver perfil">
                        <Link href="/profile">
                            <User className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

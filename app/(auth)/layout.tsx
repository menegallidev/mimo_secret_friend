import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr] bg-background overflow-hidden">
            <header className="w-full flex justify-end py-3 px-4">
                <ModeToggle />
            </header>

            <main className="flex items-center justify-center">
                <div className="w-[90%] max-w-sm">
                    {children}
                </div>
            </main>
        </div>
    );
}

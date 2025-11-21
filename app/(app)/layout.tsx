import { PrivateHeader } from "./components/private-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <PrivateHeader />

            <main className="mx-auto w-full max-w-6xl px-4 py-6">
                {children}
            </main>
        </div>
    );
}

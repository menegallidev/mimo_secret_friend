export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh bg-background flex items-center justify-center overflow-hidden">
            <div className="w-[90%] max-w-sm">
                {children}
            </div>
        </div>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <header className="relative flex items-center justify-center h-16" style={{
                boxShadow: "0 2px 4px rgba(105, 105, 105, 0.5)"
            }}>
                <h1 className="text-xl font-semibold">Interview Simulator</h1>
                <div className="absolute top-2 right-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Alpha
                </div>
            </header>
            {children}
        </div>
    );
}
import { ReportIssueButton } from 'components/ReportIssueButton';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col w-full h-full pb-5">
            <header className="flex items-center justify-between h-16 px-6" style={{
                boxShadow: "0 2px 4px rgba(105, 105, 105, 0.5)"
            }}>
                <div className="relative">
                    <h1 className="text-xl font-semibold whitespace-nowrap">Interview Simulator</h1>
                    <div className="absolute -top-1 -right-12 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full text-[10px]">
                        Alpha
                    </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex justify-end">
                    <ReportIssueButton />
                </div>
            </header>
            {children}
        </div>
    );
}
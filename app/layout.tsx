import "@/app/ui/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-w-200">
      <body className="">{children}</body>
    </html>
  );
}

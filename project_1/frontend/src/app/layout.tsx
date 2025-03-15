import MainLayout from "@/components/MainLayout";
import "../styles/styles.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Simple Notion</title>
      </head>
      <body>
        {/* Оборачиваем всё приложение в провайдер аутентификации */}
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

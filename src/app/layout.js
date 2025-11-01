import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todolist | Next.js",
  description: "A simple todolist app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "rounded-lg text-white px-4 py-3 shadow-lg",
            success: {
              style: {
                background: "linear-gradient(to right, #ec4899, #f43f5e)", // pink gradient
              },
            },
            error: {
              style: {
                background: "linear-gradient(to right, #f59e0b, #f97316)", // orange gradient
              },
            },
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}

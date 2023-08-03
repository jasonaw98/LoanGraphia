import "./globals.css";
import Nav from "@/components/Nav";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "LoanGraphia.AI | Loan Settlement Analytics by AI",
  description: "Discover the hidden analytics behind your debt with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://flowbite.com/docs/images/logo.svg" />
      </head>
      <body>
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

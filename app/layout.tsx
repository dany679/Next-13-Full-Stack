import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Sjate AI Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

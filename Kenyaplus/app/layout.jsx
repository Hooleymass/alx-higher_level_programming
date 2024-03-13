import "./globals.css";
import { Rubik } from "next/font/google";

import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Kenyaplus",
  description: "Your no. site for Juicy gospis and Latest News",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}

        <footer
          style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}
        >
          © 2024 kenyaplus
        </footer>
      </body>
    </html>
  );
}

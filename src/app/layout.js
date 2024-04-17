import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import AuthProvider from "./componentsMine/AuthProvider";


const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Anonymous Feedback",
  description: "Made with ❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>


          <Theme>

            {children}
          </Theme>





        </body>
      </AuthProvider>
    </html>
  );
}

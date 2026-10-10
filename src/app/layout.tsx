
import type { Metadata } from "next";
import {Exo} from "next/font/google";
import { Toaster } from "@/components/ui/toast"

import "./globals.css";
import Navbar from "./_component/Navbar/Navbar";
import Footer from "./_component/Footer/Footer";
import FirstNav from "./_component/FirstNav/FirstNav";
import MyProvider from "./_component/MyProvider/MyProvider";
import Providers from "./_component/TanstackProvider/TanstackProvider";

const Exofont = Exo({
  variable: "--font-Exo",
  subsets:['latin']
  
});



export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart - your one-stop online store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` ${Exofont.className} antialiased`}
    >
      {/* flex column + flex-1 on main => the footer always sits at the bottom */}
      <body className="min-h-screen flex flex-col">
        <Providers>
        <MyProvider>
          <FirstNav/>
          <Navbar/>
          <main className="flex-1 overflow-x-clip">
            <div className="container mx-auto xl:max-w-7xl">
              {children}
              <Toaster/>
            </div>
          </main>

          <Footer/>

        </MyProvider>
        </Providers>
      </body>
    </html>
  );
}

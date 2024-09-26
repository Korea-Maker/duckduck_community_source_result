import localFont from "next/font/local";  
import "./styles/globals.css";  
import Header from "./components/Header";  
import Footer from "./components/Footer";
import Head from "next/head";

const geistSans = localFont({  
  src: "./fonts/GeistVF.woff",  
  variable: "--font-geist-sans",  
  weight: "100 900",  
});  
const geistMono = localFont({  
  src: "./fonts/GeistMonoVF.woff",  
  variable: "--font-geist-mono",  
  weight: "100 900",  
});  

export default function RootLayout({ children }) {  
  return (  
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>  
        <Header />
        <main>{children}</main>
        <Footer className="mx-10" />
      </body>  
    </html>
  );  
}
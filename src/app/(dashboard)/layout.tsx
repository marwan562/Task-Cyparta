import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex h-screen container mx-auto ">
        <Sidebar className="w-64 hidden lg:block lg:w-[330px] my-6 shadow-md" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

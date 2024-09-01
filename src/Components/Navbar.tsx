"use client";

import React from "react";
import { Bell, ChevronRight, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import HeaderBreadCrumbs from "./HeaderBreadCrumbs";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-center mb-8">
      <div className="flex justify-between items-center w-full  ">
        <div className=" space-y-2">
          <Sheet>
            <SheetTrigger className="size-7 bg-black rounded-full block md:hidden">
              <ChevronRight className="size-5 text-white" />
            </SheetTrigger>
            <SheetContent className=" py-4" side={"left"}>
              <Sidebar />
            </SheetContent>
          </Sheet>
      
        </div>
        <div className="flex items-center  space-x-4">
          <Button size={"icon"} className=" group " variant="outline">
            <Bell className="h-6 w-6 text-gray-500 group-hover:rotate-12 duration-500 " />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar className="rounded-full ">
                <AvatarImage src="/images/cyprata-logo" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <hr />
              <DropdownMenuItem className="bg-red-500 hover:bg-red-600 cursor-pointer ">
                {" "}
                <LogOut className=" size-5 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

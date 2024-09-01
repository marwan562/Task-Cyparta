"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  ChevronRight,
  UserRound,
  CalendarCheck,
  ScrollText,
  CircleDollarSign,
  ClipboardCheck,
  Wallet,
} from "lucide-react";
import { Card } from "@/Components/ui/card";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const pathname = usePathname();
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(true);

  const isActive = (path: string) => pathname.includes(path);

  const toggleEmployees = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    {
      href: "/employees",
      icon: Users,
      label: "Employees",
      subItems: [
        { href: "/employees/profile", icon: UserRound, label: "Profile" },
        {
          href: "/employees/attendance",
          icon: CalendarCheck,
          label: "Attendance",
        },
        { href: "/employees/tasks", icon: ScrollText, label: "Tasks" },
      ],
    },
    { href: "/payroll", icon: CircleDollarSign, label: "Payroll" },
    { href: "/holidays", icon: ClipboardCheck, label: "Holidays" },
    { href: "/advanced-payment", icon: Wallet, label: "Advanced Payment" },
  ];

  return (
    <Card className={`w-full h-fit  rounded-[40px] ${className}`}>
      <div className="py-5">
        <Image
          width={230}
          height={158}
          src="/images/cyparta-logo.png"
          alt="Cyparta Logo"
          className="mb-8 mx-auto"
        />
        <nav className="mt-8">
          <ul className="space-y-7">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={toggleEmployees}
                      className={`flex items-center w-full px-14 py-2 text-left transition-colors duration-200 ${
                        isActive(item.href) || isEmployeesOpen
                          ? "bg-[#F9EAEB] text-red-500 font-semibold border-l-4 border-[#EC232B] rounded-r-full"
                          : "text-red-600 hover:text-red-500 "
                      }`}
                    >
                      <item.icon className="mr-2 size-6" />
                      {item.label}
                      {isEmployeesOpen ? (
                        <ChevronDown className="ml-auto size-5" />
                      ) : (
                        <ChevronRight className="ml-auto size-5" />
                      )}
                    </button>
                    {isEmployeesOpen && (
                      <ul className="ml-[70px] mt-2 space-y-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center px-4 py-2 transition-colors duration-200 ${
                                isActive(subItem.href)
                                  ? "text-gray-500 font-semibold"
                                  : "text-black hover:text-red-500"
                              }`}
                            >
                              <subItem.icon className="mr-2 size-5" />
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-14 py-2 transition-colors duration-200 ${
                      isActive(item.href)
                        ? "bg-[#F9EAEB] text-red-500 font-semibold border-l-4 border-[#EC232B] rounded-r-full"
                        : "text-black hover:text-red-500"
                    }`}
                  >
                    <item.icon className="mr-2 size-6" />
                    {item.label}
                    {item.label === "Holidays" && (
                      <ChevronRight className="ml-auto size-5" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Card>
  );
};

export default Sidebar;

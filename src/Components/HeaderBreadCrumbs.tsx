"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const HeaderBreadCrumbs = () => {
  const pathname = usePathname();

  const pathArray = pathname.split("/").filter((path) => path);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          {pathArray.map((path, index) => {
            const href = `/${pathArray.slice(0, index + 1).join("/")}`;
            const isLast = index === pathArray.length - 1;

            return (
              <React.Fragment key={index}>
                {index !== 0 && <ChevronRight className="size-7 text-black" />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-red-600 text-lg underline font-medium">
                      {capitalizeFirstLetter(path)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {capitalizeFirstLetter(path)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default HeaderBreadCrumbs;

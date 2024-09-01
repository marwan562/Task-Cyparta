"use client";

import React, { useState, useEffect } from "react";
import { BriefcaseBusiness, FileText, User2, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Separator } from "@/Components/ui/separator";
import ProfileSkeleton from "@/Components/feedback/ProfileSkeleton";
import ProfileInformation, { Employee } from "@/Components/ProfileInformation";
import UserHeaderDetails from "@/Components/UserHeaderDetails";
import HeaderBreadCrumbs from "@/Components/HeaderBreadCrumbs";
import { useAuth } from "@/context/AuthContext";

export default function EmployeeProfile() {
  const { user, loading: authLoading } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const activeTabTrigger =
    "data-[state=active]:text-[#EC232B] transition-all border-b border-b-transparent data-[state=active]:border-b-4 data-[state=active]:border-b-[#EC232B] flex flex-row items-center gap-2";

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const data: Employee = {
          mobileNumber: "01067240256",
          dateOfBirth: "July 14, 1995",
          maritalStatus: "Single",
          gender: "Female",
          nationality: "Egypt",
          address: "Maadi",
          city: "Cairo",
          state: "Cairo",
          zipCode: "35624",
          workHours: "180 hour",
          salaryPerHour: "300 EGP",
          totalSalary: "54000 EGP",
        };
        setEmployee(data);
      } catch (error) {
        setError("Failed to load employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            <HeaderBreadCrumbs />
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          {authLoading ? (
            <ProfileSkeleton />
          ) : loading ? (
            <ProfileSkeleton />
          ) : error ? (
            <p>{error}</p>
          ) : employee ? (
            <>
              <div className="flex flex-row justify-between">
                <UserHeaderDetails
                  first_name={user?.first_name}
                  last_name={user?.last_name}
                  email={user?.email}
                  image={user?.image}
                />
              </div>

              <Separator className="my-4" />

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-10 md:mb-0">
                  <TabsTrigger className={activeTabTrigger} value="personal">
                    <User2 className="size-5 rounded-full" />
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger
                    className={activeTabTrigger}
                    value="professional"
                  >
                    <BriefcaseBusiness className="size-5" />
                    Professional Information
                  </TabsTrigger>
                  <TabsTrigger className={activeTabTrigger} value="documents">
                    <FileText className="size-5" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger className={activeTabTrigger} value="access">
                    <UserCog />
                    Account Access
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <ProfileInformation employee={employee} user={user} />
                </TabsContent>
                <TabsContent value="professional">
                  <p>Professional information content goes here.</p>
                </TabsContent>
                <TabsContent value="documents">
                  <p>Documents content goes here.</p>
                </TabsContent>
                <TabsContent value="access">
                  <p>Account access content goes here.</p>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <p>No employee data available.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

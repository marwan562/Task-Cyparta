"use client";

import { loginUser } from "@/actions/authApi";
import { Card } from "@/Components/ui/card";
import FormLogInUser, { TFormSchema } from "@/Form/FormLogInUser";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface CustomError {
  detail: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginUser = async (data: TFormSchema) => {
    setIsLoading(true);
    try {
      await loginUser(data);
      toast.success("Login Successfully.");
    } catch (err: unknown) {
      setIsLoading(false);

      if (err instanceof Error) {
        toast.error(err.message);
      } else if (err && typeof err === "object" && "detail" in err) {
        const customError = err as CustomError;
        toast.error(customError.detail);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        width={225}
        height={102}
        src={"/images/cyparta-logo.png"}
        className=" object-cover"
        alt="cyprata-logo"
      />
      <Card className="w-[530px]    mt-5 p-8   shadow-md">
        <FormLogInUser isLoading={isLoading} onSave={handleLoginUser} />
      </Card>
    </div>
  );
};

export default LoginPage;

"use client";

import { Card } from "@/Components/ui/card";
import { useAuth } from "@/context/AuthContext";
import FormLogInUser from "@/Form/FormLogInUser";
import Image from "next/image";

const LoginPage = () => {
  const { loginUser, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        width={225}
        height={102}
        src={"/images/cyparta-logo.png"}
        className=" object-cover"
        alt="cyprata-logo"
      />
      <Card className="w-full max-w-[530px]   mx-3 mt-5 p-8   shadow-lg">
        <FormLogInUser isLoading={loading} onSave={loginUser} />
      </Card>
    </div>
  );
};

export default LoginPage;

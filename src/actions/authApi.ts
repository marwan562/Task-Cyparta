import { toast } from "sonner";

type TPropsLogin = {
  email: string;
  password: string;
};

export const loginUserApi = async (body: TPropsLogin) => {
  const res = await fetch(`${process.env.BASE_URL}/api/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    toast.error(errorData.detail);
    throw new Error(errorData.detail || "Network Error.");
  }

  toast.success("Login User Successfully.");

  return await res.json();
};

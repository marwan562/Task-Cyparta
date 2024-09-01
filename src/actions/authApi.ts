import { toast } from "sonner";

type TPropsLogin = {
  email: string;
  password: string;
};

const API_URL = `${process.env.BASE_URL}`;

export const loginUserApi = async (body: TPropsLogin) => {
  try {
    const urlEncodedBody = new URLSearchParams({
      email: body.email,
      password: body.password,
    });

    const res = await fetch(`${API_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedBody.toString(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Network Error.");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};


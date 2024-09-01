import { IUser, TUpdateUser } from "@/types";

export const getUser = async (token: string | null): Promise<IUser> => {
  const res = await fetch(`${process.env.BASE_URL}/api/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Network Error.");
  }

  return await res.json();
};

export const updateUserDetails = async ({
  body,
  token,
}: {
  body: TUpdateUser;
  token: string | null;
}) => {
  const res = await fetch(`${process.env.BASE_URL}/api/profile/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authantication: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Network Error.");
  }

  return await res.json();
  
};

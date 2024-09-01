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
    throw new Error(errorData.detail || "Network Error.");
  }

  return await res.json();
};



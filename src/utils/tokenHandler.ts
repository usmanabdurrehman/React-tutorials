export const setAccessToken = (token: string): void => {
  localStorage.setItem("access_token", token);
};

export const getAccessToken = (): string | null => {
  return typeof localStorage === "object"
    ? localStorage.getItem("access_token")
    : null;
};

export const removeAccessToken = (): void => {
  if (getAccessToken() != null) localStorage.removeItem("access_token");
};

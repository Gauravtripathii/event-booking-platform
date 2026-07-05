export type UserData = {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type UserResponse = {
  username: string;
  email: string;
  role: "USER" | "ADMIN";
};

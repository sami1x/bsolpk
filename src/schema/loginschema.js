import { z } from "zod";

const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please enter you username." })
    .email({ message: "Invalid username." })
    .max(50),
  password: z
    .string({ message: "Password is required." })
    .min(1, { message: "Password is required." })
    .min(4, { message: "Password is too short." })
    .max(50),
  role: z.enum(["admin", "teacher", "student"], {
    message: "Please select your role.",
  }),
});

export default LoginFormSchema;

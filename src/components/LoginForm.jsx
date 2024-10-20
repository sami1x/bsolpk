import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginFormSchema from "@/schema/loginschema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

console.log("Backend url", import.meta.env.VITE_BACKEND);

const LoginForm = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Role");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  function onSubmit(values) {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setLoginError(null);
        form.reset({
          username: "",
          password: "",
          role: values.role,
        });
        const user = JSON.stringify({
          username: values.username,
          role: values.role,
        });
        localStorage.setItem("authToken", user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setLoginError(true);
        setLoading(false);
        form.reset({
          username: "",
          password: "",
          role: values.role,
        });
      });
  }

  return (
    <>
      <div className="text-center text-sm text-destructive font-fortext">
        {loginError && "Username or password incorrect"}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-fortext">Username</FormLabel>
                <FormControl>
                  <Input
                    className="border border-black border-solid"
                    onFocus={() => setLoginError(null)}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-fortext" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="font-fortext">Password</FormLabel>
                <FormControl>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    className="border border-black border-solid pr-10"
                    onFocus={() => setLoginError(null)}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-fortext" />
                <div
                  className="absolute right-[13px] top-[35px] cursor-pointer"
                  onClick={() => {
                    setPasswordVisible((e) => {
                      return !e;
                    });
                  }}
                >
                  {passwordVisible ? (
                    <AiFillEye className="text-neutral-700" />
                  ) : (
                    <AiFillEyeInvisible className="text-neutral-700" />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-fortext">Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      // Set the selected role in the form state
                      field.onChange(value);
                      setSelectedValue(value);
                      setLoginError(null);
                    }}
                  >
                    <SelectTrigger
                      currentvalue={selectedValue}
                      displaytext="Role"
                      className="border border-black border-solid"
                    >
                      <SelectValue placeholder="Role" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="font-fortext" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center pt-4">
            <Button
              className="w-full bg-[#870808] hover:bg-[#053976] transition"
              type="submit"
            >
              {loading ? "Validating..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;

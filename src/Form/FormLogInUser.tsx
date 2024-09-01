import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { CardFooter } from "@/Components/ui/card";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

export type TFormSchema = z.infer<typeof FormSchema>;

type TFormProps = {
  isLoading: boolean;
  onSave: (form: TFormSchema) => void;
};

const FormLogInUser = ({ isLoading, onSave }: TFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
  });

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: TFormSchema) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4" style={{marginBottom:25}}>
          {/* Email  */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="test@task.com"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password  */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    {...field}
                    icon={
                      <span
                        className="h-4 w-4 text-gray-500 cursor-pointer"
                        onClick={showPasswordHandler}
                      >
                        {!showPassword ? <EyeOff /> : <Eye />}
                      </span>
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm pr-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CardFooter>
          <Button disabled={isLoading} type="submit" className="w-full mt-5">
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span> Checking...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default FormLogInUser;

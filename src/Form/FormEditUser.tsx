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
import { Loader2 } from "lucide-react";
import { CardFooter } from "@/Components/ui/card";

const FormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

export type TFormSchema = z.infer<typeof FormSchema>;

type TFormProps = {
  isLoading: boolean;
  onSave: (form: TFormSchema) => void;
};

const FormEditUser = ({ isLoading, onSave }: TFormProps) => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: TFormSchema) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Task"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Test"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your phone number"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Tell us about yourself"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Submit Button */}
        <CardFooter className="mt-4">
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? (
              <div className="flex flex-row items-center">
                <Loader2 className="animate-spin mr-2" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default FormEditUser;

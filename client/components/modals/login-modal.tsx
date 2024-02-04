import React, { useCallback, useState } from "react";
import Modal from "@/components/ui/modal";
import useLoginModal from "@/hooks/use-login-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterModal from "@/hooks/use-register-modal";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const [error, setError] = useState<string>("");

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const { data } = await axios.post("/api/auth/login", values);
      if (data.success) {
        await signIn("credentials", {
          email: data.email,
          password: values.password,
        });
        loginModal.onClose();
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else setError("Something went wrong. Please try again latter.");
    }
  }

  const { isSubmitting } = form.formState;

  const body = (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-12"
        >
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            label={`Login`}
            type="submit"
            secondary
            fullWidth
            large
            disabled={isSubmitting}
          />
        </form>
      </Form>
    </>
  );

  const footer = (
    <div className={`text-neutral-400 text-center mb-4`}>
      <p>
        First time using X?{" "}
        <span
          className={`text-white cursor-pointer hover:underline`}
          onClick={onToggle}
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={body}
      footer={footer}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    />
  );
};

export default LoginModal;

"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import useRegisterModel from "@/hooks/use-register-modal";
import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterStepOneSchema, RegisterStepTwoSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import useLoginModal from "@/hooks/use-login-modal";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "" });
  const registerModal = useRegisterModel();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const body =
    step === 1 ? (
      <RegisterStepOne setStep={setStep} setData={setData} />
    ) : (
      <RegisterStepTwo data={data} />
    );

  const footer = (
    <div className={`text-neutral-400 text-center mb-4`}>
      <p>
        Already have a account?{" "}
        <span
          className={`text-white cursor-pointer hover:underline`}
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={body}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalStep={2}
    />
  );
};

export default RegisterModal;

const RegisterStepOne = ({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof RegisterStepOneSchema>>({
    resolver: zodResolver(RegisterStepOneSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterStepOneSchema>) {
    try {
      const { data } = await axios.post("/api/auth/register?step=1", values);
      if (data.success) {
        setData(values);
        setStep(2);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else setError("Something went wrong. Please try again latter.");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <h3 className={`text-3xl font-semibold text-white`}>
          Create an account
        </h3>

        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button
          label={`Next`}
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
};

const RegisterStepTwo = ({
  data,
}: {
  data: { name: string; email: string };
}) => {
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof RegisterStepTwoSchema>>({
    resolver: zodResolver(RegisterStepTwoSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const registerModal = useRegisterModel();
  async function onSubmit(values: z.infer<typeof RegisterStepTwoSchema>) {
    try {
      const { data: response } = await axios.post("/api/auth/register?step=2", {
        ...data,
        ...values,
      });

      if (response.success) {
        await signIn("credentials", {
          email: data.email,
          password: values.password,
        });
        registerModal.onClose();
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else setError("Something went wrong. Please try again latter.");
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
          label={`Register`}
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
};

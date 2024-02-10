"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModel from "@/hooks/use-register-modal";
import RegisterModal from "@/components/modals/register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import LoginModal from "@/components/modals/login-modal";
import { signIn } from "next-auth/react";

const Auth = () => {
  const registerModal = useRegisterModel();
  const loginModal = useLoginModal();

  const onOpenRegisterModel = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModel = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen`}
      >
        <Image
          src={`/images/x.svg`}
          alt={`x`}
          width={450}
          height={450}
          className={`justify-self-center hidden md:block`}
        />
        <div
          className={`flex flex-col justify-center md:justify-between h-full md:h-[70vh] space-y-6`}
        >
          <div className={`block md:hidden`}>
            <Image src={`/images/x.svg`} alt={`x`} width={50} height={50} />
          </div>
          <h1 className={`font-bold text-6xl`}>Happening now</h1>
          <div className={`w-full md:w-[60%]`}>
            <h2 className={`font-bold text-3xl mb-4`}>Join today.</h2>
            <div className={`flex flex-col space-y-2`}>
              <Button
                onClick={() => signIn("google")}
                label={
                  <div className={`flex gap-2 items-center justify-center`}>
                    <FcGoogle />
                    Sign up with Google
                  </div>
                }
                secondary
                fullWidth
              />
              <Button
                onClick={() => signIn("github")}
                label={
                  <div className={`flex gap-2 items-center justify-center`}>
                    <AiFillGithub />
                    Sign up with Github
                  </div>
                }
                secondary
                fullWidth
              />
              <div className={`flex items-center justify-center`}>
                <div className={`h-px bg-gray-700 w-1/2`}></div>
                <p className={`mx-4`}>or</p>
                <div className={`h-px bg-gray-700 w-1/2`}></div>
              </div>
              <Button
                label={`Create account`}
                fullWidth
                onClick={onOpenRegisterModel}
              />
              <div className={`text-[10px] text-gray-400`}>
                By signing up, you agree to the{" "}
                <span className={`text-sky-500`}>Terms of Service</span> and
                <span className={`text-sky-500`}> Privacy Policy</span>,
                including
                <span className={`text-sky-500`}> Cookie Use</span>.
              </div>
            </div>
          </div>
          <div className={`w-full md:w-[60%]`}>
            <h3 className={`font-medium text-xl mb-4`}>
              Already have you account?
            </h3>
            <Button
              onClick={onOpenLoginModel}
              label={`Sign in`}
              outline
              fullWidth
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

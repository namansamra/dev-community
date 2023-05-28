import Header from "@/components/Header";
import { Button, Divider, Flex, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import React from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSessionCustom } from "@/lib/next-auth-react-query";

const getEnterMethods = (signup = false) => [
  {
    name: "google",
    icon: <FcGoogle size={20} />,
    title: `${signup ? "Sign up" : "Continue"} with Google`,
    textColor: "text-grey-800",
    bg: "bg-grey-200",
    hover: "hover:bg-grey-300 hover:text-grey-900",
  },
  {
    name: "github",
    icon: <AiFillGithub size={20} />,
    title: `${signup ? "Sign up" : "Continue"} with GitHub`,
    textColor: "text-white",
    bg: "bg-[#24292e]",
    hover: "hover:bg-black",
  },
];

function Enter() {
  const { query } = useRouter();
  const { session, status } = useSessionCustom();
  const router = useRouter();
  const state = query.state;

  if (session && session.user) {
    router.push("/");
    return null;
  }
  return (
    <div className="flex flex-col w-full relative">
      <Header containerStyles="sticky top-0 left-0 right-0" />
      <div className="flex justify-center items-center w-full pt-2 pb-10 bg-grey-50">
        <div className="flex flex-col items-center w-full md:w-[640px] bg-white rounded-md p-5 mx-auto  border-[1px] border-grey-200">
          <h2 className="text-[20px] text-grey-900 font-bold md:text-[30px] text-center">
            Welcome to DEV Community 👩‍💻👨‍💻
          </h2>
          <span className="text-grey-700 text-md text-center">
            DEV Community 👩‍💻👨‍💻 is a community of 1,003,060 amazing developers
          </span>

          <div className="flex flex-col gap-2 w-full my-8">
            {getEnterMethods(state == "newuser").map((login) => (
              <Button
                key={login.name}
                className={`w-full ${login.textColor} ${login.bg} ${login.hover} text-base p-4 h-12`}
                leftIcon={login.icon}
                onClick={() => signIn(login.name, { callbackUrl: "/" })}
              >
                {login.title}
              </Button>
            ))}

            <Flex className="justify-center items-center mt-2">
              <Divider orientation="horizontal" />

              {state === "newuser" ? (
                <div className="flex items-center justify-center text-sm min-w-max">
                  Already have account?
                  <Link
                    className="inline ml-2 hover:underline text-primaryBlue"
                    href={"/enter"}
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center text-sm min-w-max">
                  Do not have account?
                  <Link
                    className="inline ml-2  hover:underline text-primaryBlue"
                    href={"/enter?state=newuser"}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <Divider orientation="horizontal" />
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enter;

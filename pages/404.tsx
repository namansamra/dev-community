import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

function ErrorPage() {
  return (
    <div className="flex flex-col w-full relative h-screen">
      <Header containerStyles="sticky top-0 left-0 right-0" />
      <div className="flex justify-center items-center w-full py-2 pb-10 bg-grey-50 h-full">
        <div className="flex flex-col items-center w-full md:w-[640px] bg-white rounded-md p-5 mx-auto  border-[1px] border-grey-200">
          <h2 className="text-[20px] text-grey-900 font-bold md:text-[30px] text-center">
            Feature is under development
          </h2>
          <span className="text-primaryBlue hover:underline text-md text-center">
            <Link href={"/"}>Back to Home</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;

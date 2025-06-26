"use client";

import { Button } from "@/components/ui";
import { RandomizedTextEffect } from "@/components/ui/text-randomized";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
export default function NotFoundPage() {
  return (
    <>
      {/* Add structured data for the 404 page */}

      <div className="fixed w-screen h-screen bg-[var(--background)]  flex flex-col justify-center items-center  z-50 inset-0">
        <div className="flex flex-col items-center justify-center text-center">
          <RandomizedTextEffect
            className="mt-6 text-3xl font-bold tracking-tight text-[var(--headline)] sm:text-5xl"
            text={"404 | Page Not Found"}
          />

          <RandomizedTextEffect
            className="mt-4 text-xl text-[var(--paragraph)]"
            text={"The page you are looking for doesn't exist."}
          />

          <div className="mt-8 w-max">
            <Link href="/">
              <Button>
                <IoArrowBack />
                <span>Back To HomePage</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

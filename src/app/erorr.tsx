"use client";

import { RandomizedTextEffect } from "@/components/ui/text-randomized";

export default function ErrorPage() {
  return (
    <div className="  relative h-[50vh] flex justify-center items-center w-full ">
      <div className="flex flex-col m-auto absolute items-center justify-center">
        <RandomizedTextEffect
          className="mt-6 text-2xl font-bold tracking-tight text-[var(--headline)] sm:text-4xl"
          text={"403 | Erorr"}
        />

        <RandomizedTextEffect
          className="mt-4 text-[var(--paragraph)]"
          text={"Some error text"}
        />
      </div>
    </div>
  );
}

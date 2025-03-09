"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com";
import { MagicCard } from "../ui/MagicCard";
import WorldMapDemo from "./WorldMapDemo";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    emailjs
      .sendForm(
        "service_vr92r5g",
        "template_dvr1x78",
        data,
        "5J3vip7CH5ZH9OLZv"
      )
      .then(
        (result: any) => {
          console.log(result.text);
        },
        (error: any) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div >
        <MagicCard
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          gradientColor="#7e7e7e12"
          className={cn(
            "group container overflow-hidden transition-all duration-300",
            "border-[var(--card-border-color)] bg-[var(--card-background)]"
          )}
          ref={undefined}
        >
          <div className="flex flex-col bg-transparent">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 bg-transparent py-[20px]"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--headline)]">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className="rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[var(--paragraph)]">
                        {/* Please provide your full name. */}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--headline)]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[var(--paragraph)]">
                        {/* We will use this email to contact you. */}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--headline)]">
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here"
                          className="h-[200px] rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[var(--paragraph)]">
                        {/* Please provide a detailed message. */}
                      </FormDescription>
                      <FormMessage className="text-red-500 hoverd" />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </MagicCard>
      </div>

      <div className="container flex items-center justify-center">
        <WorldMapDemo />
      </div>
    </div>
  );
}

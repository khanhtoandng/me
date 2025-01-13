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

// Define form validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission and send data using EmailJS
  const onSubmit = (data: any) => {
    emailjs
      .sendForm(
        "service_vr92r5g",
        "template_dvr1x78",
        data,
        "5J3vip7CH5ZH9OLZv",
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 p-[20px]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--headline)]">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  className="rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[var(--paragraph)]">
                Your full name.
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
              <FormLabel className="text-[var(--headline)]">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Email"
                  className="rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[var(--paragraph)]">
                Your email address.
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
              <FormLabel className="text-[var(--headline)]">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your Message"
                  className="h-[200px] rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[var(--paragraph)]">
                Your message to us.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="border-[var(--button-border)] bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)]"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

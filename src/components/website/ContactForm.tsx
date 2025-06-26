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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ScrollEffect } from "@/lib/animations";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // First, save to database
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Also try to send email via EmailJS as backup
        try {
          const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
          const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
          const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

          if (serviceId && templateId && userId) {
            await emailjs.send(
              serviceId,
              templateId,
              {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
              },
              userId,
            );
            console.log("Email sent successfully via EmailJS");
          }
        } catch (emailError) {
          console.error(
            "EmailJS failed, but message was saved to database:",
            emailError,
          );
        }

        form.reset();
        toast.success("Message sent successfully! I'll get back to you soon.");
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <MagicCard
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        gradientColor="#7e7e7e12"
        className={cn(
          "group container overflow-hidden transition-all duration-300",
          "border-[var(--card-border-color)] bg-[var(--card-background)]",
        )}
        ref={undefined}
      >
        <div className="flex flex-col bg-transparent">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 bg-transparent py-[20px] border-none"
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
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--headline)]">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter message subject"
                        className="rounded-[8px] border-[var(--input-border-color)] bg-[var(--input-background)] text-[var(--input-text)]"
                        {...field}
                      />
                    </FormControl>
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
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </MagicCard>
    </div>
  );
}

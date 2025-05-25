"use client";

import ImagePicker from "@/components/meals/image-picker";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { shareMeal } from "@/libs/actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./page.module.css";

const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  instructions: z.string().min(1, "Instructions are required"),
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null && file.size > 0, {
      message: "Image is required",
    }),
});

type FormData = z.infer<typeof mealSchema>;

export default function ShareMealPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      summary: "",
      instructions: "",
      image: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("instructions", data.instructions);
    if (data.image) {
      formData.append("image", data.image);
    }
    await shareMeal(formData);
  };

  return (
    <>
      <header className={classes.header}>
        <h1 className="text-4xl font-bold mb-3">
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <Form {...form}>
          <form className={classes.form} onSubmit={form.handleSubmit(onSubmit)}>
            <div className={classes.row}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Your email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Short Summary</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a short summary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter cooking instructions"
                      className="h-80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Your image</FormLabel>
                  <FormControl>
                    <ImagePicker
                      name="image"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className={classes.actions}>
              <MealsFormSubmit />
            </p>
          </form>
        </Form>
      </main>
    </>
  );
}

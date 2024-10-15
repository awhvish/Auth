"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { Input } from "../ui/input" 
import { Button } from "../ui/button"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { login } from "@/actions/login"
import { useTransition, useState } from "react"
import { useSearchParams } from "next/navigation"

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider":"";
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSumbit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
        
    }
    return (
        <CardWrapper headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSumbit)}
                    className="space-y-6" >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="johndoe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>

                        </FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Password"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error || urlError} />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
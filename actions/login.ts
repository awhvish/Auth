"use server"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/lib/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/email"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success){
        return {error: "Invalid Fields"}
    }
    const { email, password } = validateFields.data;
    
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "User does not exist"};
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {success: "Confirmation email sent!"}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        })
    }
    catch(error){
        if (error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                case "CallbackRouteError":
                    return {error: "Invalid credentials"}
                default:
                    console.log("the error is: ", error.type)
                    return {error: "Something went wrong"}

            }
        }
        throw error;

    }
    return {success: "Email sent"}
}
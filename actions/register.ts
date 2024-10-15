"use server"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success){
        return {error: "Invalid Fields"}
    }
    const {email, password, name} = validateFields.data;
    const hashedPass = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {error: "Email already registered to another account"}
    }
    try {
        const createdUser = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPass
            }
        })
    }
    catch (error){
        return {error: `Error creating user: ${error}`}
    }


    const verificationToken = await generateVerificationToken(email);
    // Send verification token email

    sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {success: "Confirmation email sent!"}
}       
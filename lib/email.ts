import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `localhost:3000/auth/new-verification?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Confirmation Mail',
        html: `Click here ${confirmLink} to Verify`
    });
    if (error) {
        return console.error({ error });
    }
    console.log(data);
}   
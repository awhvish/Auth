import { CardWrapper } from "@/components/auth/card-wrapper";

export default function ErrorPage() {
    return (
        <>
        <CardWrapper headerLabel="Oops something went wrong!" backButtonHref="/auth/login" backButtonLabel="Back to login">wrapped</CardWrapper>
        </>
    )
}
"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token){
            setError("No Token!");
            return;
        }
        newVerification(token).then((data) => {
            if (data.error) {
                setError(data.error);
            } else if (data.success) {
                setSuccess(data.success);
            }
        }).catch((err) => {
            setError("An error occurred");
        });
    }, [token, success, error]);

    useEffect( () => {
        onSubmit();
    }, [onSubmit]);
  return (
    <CardWrapper headerLabel="Confirming your verification" backButtonHref="/auth/login" backButtonLabel="Back to login">
        <div className="flex items-center w-full justify-center">

            <FormError message={error} />
            <FormSuccess message={success}/>
        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm;

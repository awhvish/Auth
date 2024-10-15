import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
const Settings = async () => {
    const session = await auth();

    const handleSignout = async () => {
        "use server"
        await signOut({redirectTo:"/"})
    }
    return (
        <>
        {JSON.stringify(session)}
        <form action={handleSignout}>
            <Button variant="destructive" type="submit">Signout</Button>
        </form>
        </>      
    );
}

export default Settings;        
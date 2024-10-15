import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/login-button";
const font = Poppins({
  subsets: ["latin"],
  weight:["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-400 to-gray-800">
      <div className="text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className,)}>
          Auth
        </h1>
      </div>
      <p className="text-white text-lg mt-5 mb-5"> 
        Simple Authentication service</p>
      <div className="p-5">
        <LoginButton>
          <Button variant="secondary" size="lg">Sign In</Button>
        </LoginButton>
      </div>
      <div>
        <RegisterButton>
          <Button variant="secondary" size="lg">Register</Button>
        </RegisterButton>
      </div>
    </main>
  );
}

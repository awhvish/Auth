import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight:["600"]
  })

const authLayout = ({children}:
    {children:React.ReactNode}) => {
    return (
        <main className="flex h-full flex-col items-center justify-center 
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-400 to-gray-800">            
         {children}
        </main>
    )
}

export default authLayout;



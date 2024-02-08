import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

export const MainNavbar = () => {
  const router = useRouter();
  const {data: session} = useSession();
  return (
    <>
      <div className="bg-white/[0.6] backdrop-blur-sm min-h-16 sticky top-0 flex justify-center w-full max-w-full z-[101] border-b">
        <header className="w-full container flex items-center justify-between">
          <h1 className="text-lg font-manrope font-bold">E-Library</h1>
          <div className="flex items-center gap-3 font-poppins text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary">Home</Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link>
            {session?.user ? (
              <p className="text-muted-foreground hover:text-primary">{session.user.username}</p>
            ) : (
              <Button  asChild>
                {router.pathname === "/register" ? (
                  <Link href="/login">Log in</Link>
                ) : (
                  <Link href="/register">Sign Up</Link>
                )}
              </Button>
            )}
          </div>
        </header>
      </div>
    </>
  )
}

import {useRouter} from "next/router";
import {Book, BookCopy, Bookmark, Home, LucideIcon} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";


type DashboardLinksType = {
  icon: LucideIcon,
  label: string,
  href: string
}

const DashboardLinks: DashboardLinksType[] = [
  {
    icon: Home,
    label: "Home",
    href: "/"
  },
  {
    icon: BookCopy,
    label: "Loans",
    href: "#"
  },
  {
    icon: Bookmark,
    label: "Bookmark Books",
    href: "#"
  }
]


export const Sidebar = () => {
  const router = useRouter();
  return (
    <>
      <aside className="fixed top-0 z-[60] h-screen w-full max-w-[280px] overflow-y-auto border-r bg-[#FFF] pb-7 pt-5 space-y-4">
        <h1 className="text-center text-2xl font-bold">E-Library</h1>
        <div className="space-y-5 px-2">
          <div className="space-y-1">
            {DashboardLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 font-medium text-[#344054]",
                  router.pathname.includes(link.href) && "rounded-lg bg-[#F5F5FF] font-semibold"
                )}
              >
               <link.icon stroke={router.pathname.includes(link.href) ? "#4B4EFC" : "#344054" } className="mr-2 w-5 h-5"/>
               <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

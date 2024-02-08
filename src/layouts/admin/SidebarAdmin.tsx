import {Book, GaugeCircle, GraduationCap, Library, ListMinus, LucideIcon, NotebookPen, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useRouter} from "next/router";


type LinkTypes = {
  icon: LucideIcon,
  label: string,
  href: string
}

const linksDef: LinkTypes[] = [
  {
    icon: GaugeCircle,
    label: "Dashboard",
    href: "/admin/dashboard"
  },
  {
    icon: Book,
    label: "Book",
    href: "/admin/manage-books"
  }
]

const masterDataLinks: LinkTypes[] = [
  {
    icon: ListMinus,
    label: "Category",
    href: "/admin/manage-category"
  },
  {
    icon: User,
    label: "Staff",
    href: "/admin/manage-staff"
  },
  {
    icon: NotebookPen,
    label: "Author",
    href: "/admin/manage-author"
  },
  {
    icon: Library, 
    label: "Bookshelf",
    href: "/admin/manage-shelf"
  }
]

export const SidebarAdmin = () => {
  const router = useRouter();
  return (
    <>
      <aside className="px-3 h-screen fixed top-0 left-0 bg-[#FFFFFF] space-y-4 max-w-[280px] w-full border-r">
          <div className="py-4 text-center">
            <h1 className="text-[#222831] text-2xl font-semibold">E-Library</h1>
          </div>
          <div className="flex flex-col gap-3">
            {linksDef.map((link) => (
              <Button asChild size="lg" variant="ghost" className={cn("justify-start", router.pathname.includes(link.href) && "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90")} key={link.label}>
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4"/>
                  <p className="font-medium">{link.label}</p>
                </Link>
              </Button>
            ))}
          </div>
          <hr/>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Master data</p>
            <div className="flex flex-col gap-3">
              {masterDataLinks.map((link) => (
                <Button asChild size="lg" variant="ghost" className={cn("justify-start", router.pathname === link.href && "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90")} key={link.label}>
                  <Link href={link.href}>
                    <link.icon className="mr-2 h-4 w-4"/>
                    <p className="font-medium">{link.label}</p>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </aside>
    </>
  )
}

import Link from "next/link";
import {Github} from "lucide-react";


export const MainFooter = () => {
  return (
    <>
      <footer className="min-h-16 border-t flex justify-center">
        <div className="container flex items-center justify-between text-sm font-poppins">
          <p>Copyright © Budiman | ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-3">
            <Link className="flex items-center gap-2 hover:underline" href="https://github.com/Jayennn">
              <Github size={18}/>
              Github
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

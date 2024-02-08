import {PropsWithChildren} from "react";
import {Sidebar} from "@/layouts/user/Sidebar";
import {DashboardNav} from "@/layouts/user/Navbar";


const UserLayout = (props: PropsWithChildren) => {
  return (
    <>
      <main className="flex gap-2 min-h-screen">
        <Sidebar/>
        <div className="pl-[17.5rem] w-full h-screen bg-[#F9FAFB]">
          <DashboardNav/>
          <div className="container py-8">
            {props.children}
          </div>
        </div>
      </main>
    </>
  )
}

export default UserLayout;

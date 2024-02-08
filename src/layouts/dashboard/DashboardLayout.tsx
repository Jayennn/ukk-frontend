import {PropsWithChildren} from "react";
import {DashboardSidebar} from "@/layouts/dashboard/DashboardSidebar";
import {DashboardNav} from "@/layouts/dashboard/DashboardNavbar";


const DashboardLayout = (props: PropsWithChildren) => {
  return (
    <>
      <main className="flex gap-2 min-h-screen">
        <DashboardSidebar/>
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

export default DashboardLayout;

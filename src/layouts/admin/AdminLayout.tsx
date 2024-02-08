import {PropsWithChildren} from "react";
import {SidebarAdmin} from "@/layouts/admin/SidebarAdmin";


const AdminLayout = (props: PropsWithChildren) => {
  return (
    <>
      <div className="flex gap-2 min-h-screen">
        <SidebarAdmin/>
        <div className="pl-[20rem] w-full h-screen bg-[#F9FAFB]">
          <div className="container py-8">
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout;

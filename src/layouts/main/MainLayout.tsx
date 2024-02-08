import {PropsWithChildren} from "react";
import {MainNavbar} from "@/layouts/main/MainNavbar";
import {MainFooter} from "@/layouts/main/MainFooter";


const MainLayout = (props: PropsWithChildren) => {
  return (
    <>
      <MainNavbar/>
        <main className="relative">
          {props.children}
        </main>
      <MainFooter/>
    </>
  )
}

export default MainLayout;

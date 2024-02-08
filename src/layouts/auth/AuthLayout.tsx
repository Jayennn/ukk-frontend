import {PropsWithChildren} from "react";
import {MainNavbar} from "@/layouts/main/MainNavbar";
import {MainFooter} from "@/layouts/main/MainFooter";


const AuthLayout = (props: PropsWithChildren) => {
  return (
    <>
      <MainNavbar/>
        <div className="h-screen flex items-center justify-center">
          {props.children}
        </div>
      <MainFooter/>
    </>
  )
}

export default AuthLayout;

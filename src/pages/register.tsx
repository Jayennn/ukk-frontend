import {NextPageWithLayout} from "@/pages/_app";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth/AuthLayout";
import {Button} from "@/components/ui/button";


const Page: NextPageWithLayout = () => {
  return (
    <>
      <form className="border rounded-lg p-8 w-full max-w-xl space-y-7">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-[#1D2739] tracking-tight text-2xl font-semibold">Create an account</h1>
          <p className="text-muted-foreground text-sm">Enter your detail below to create your account and get started</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="fullname">Fullname</Label>
              <Input id="fullname" placeholder="Fullname"/>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input id="phone-number" type="number" placeholder="Phone number"/>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password"/>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm password"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" className="min-h-28 resize-none" placeholder="Address"/>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Register</Button>
        </div>
      </form>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement){
  return <AuthLayout>{page}</AuthLayout>
}

export default Page;

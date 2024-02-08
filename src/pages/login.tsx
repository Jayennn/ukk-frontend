import {NextPageWithLayout} from "@/pages/_app";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth/AuthLayout";
import {LoginForm, loginFormSchema} from "@/server/api/routers/login/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {toast} from "sonner";
import {useRouter} from "next/router";


const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = async({username, password}: LoginForm) => {
    try {
      const res = await signIn("credentials", {
        username,
        password,
        callbackUrl: "/authorization",
        redirect: false
      })

      if(res?.error){
        toast.error(res.error)
      }

      if(res?.ok){
        toast.success("Login Success")
        await router.replace(`${res.url ?? ""}`)
      }


    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg p-8 w-full max-w-sm space-y-7">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-[#1D2739] tracking-tight text-2xl font-semibold">Welcome back</h1>
          <p className="leading-[1.2] text-center text-sm text-muted-foreground">
            Glad to see you again
            <br/>
            Login to your account bellow
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 text-sm">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username")}
              id="username"
              name="username"
              placeholder="enter username..."
            />
            {errors.username?.message && <p className="text-sm font-medium text-red-500">{errors.username.message}</p>}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              name="password"
              placeholder="enter password..."
            />
            {errors.password?.message && <p className="text-sm font-medium text-red-500">{errors.password.message}</p>}
          </div>
        </div>
        <Button type="submit" className="w-full">login</Button>
      </form>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement){
  return <AuthLayout>{page}</AuthLayout>
}

export default Page;

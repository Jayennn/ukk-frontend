import {GetServerSideProps} from "next";
import {getToken} from "next-auth/jwt";
import {redirect} from "next/navigation";


const Page = () => {
  return (
    <>
      Loading Auth
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async(
  {req}) => {
  const token = await getToken({req});
  const isAuthenticated = !!token;

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  if(isAuthenticated && token?.role === "siswa"){
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }

  if(isAuthenticated && token?.role === "admin"){
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false
      }
    }
  }
}

export default Page;

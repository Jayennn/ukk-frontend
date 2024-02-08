import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";


const Page: NextPageWithLayout = () => {
  return (
    <>
      <h1>Jello Horld</h1>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;

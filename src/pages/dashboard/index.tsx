import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <h1 className="text-lg font-semibold">Hello world</h1>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;

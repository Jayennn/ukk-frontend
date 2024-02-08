import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import React, {ReactElement} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {trpc} from "@/utils/trpc";
import Image from "next/image";
import {BookCoverSkeleton} from "@/components/skeleton/BookCoverSkeleton";
import {Button} from "@/components/ui/button";
import {BookTitleSkeleton} from "@/components/skeleton/BookTitleSkeleton";


const Page: NextPageWithLayout = () => {

  const router = useRouter();

  const {data: book, isLoading} = trpc.book.detail.useQuery({
    id: Number(router.query.book_id)
  });

  return (
    <>
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 flex flex-col space-y-4">
          <div>
            <Button size="sm" onClick={() => router.back()}>Back</Button>
          </div>
          <div className="flex space-x-6">
            <BookCoverSkeleton
              isLoading={book?.data.book_cover === undefined}
              src={book?.data.book_cover}
              alt="book-cover"
            />
            <div className="min-w-[20rem] space-y-6">
              <BookTitleSkeleton
                isLoading={book?.data.book_title === undefined}
                title={book?.data.book_title}
              />
              <div className="flex flex-col gap-2">
                <div className="text-sm flex items-center">
                  <h5 className="w-full max-w-[7rem] font-bold">Release</h5>
                  <p className="text-muted-foreground">{book?.data.release_date}</p>
                </div>
                <div className="text-sm flex items-center">
                  <h5 className="w-full max-w-[7rem] font-bold">Category</h5>
                  <p className="text-muted-foreground">{book?.data.category.category_name}</p>
                </div>
                <div className="text-sm flex items-center">
                  <h5 className="w-full max-w-[7rem] font-bold">Author(s)</h5>
                  <div className="flex items-center gap-5">
                    {book?.data.author_books.map((author) => (
                      <span key={author.author.id} className="flex items-center">
                        <Image width={150} height={150} className="w-9 h-9 rounded-full object-cover mr-2 border" src={author.author.author_image ?? "/nopfp.jpg"} alt="author-image"/>
                        <p className="text-muted-foreground">{author.author.author_name}</p>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;

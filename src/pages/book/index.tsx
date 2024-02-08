import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement} from "react";
import MainLayout from "@/layouts/main/MainLayout";
import {trpc} from "@/utils/trpc";
import {BookCoverSkeleton} from "@/components/skeleton/BookCoverSkeleton";
import Link from "next/link";
import {CalendarFold, Info, Layers3} from "lucide-react";


const Page: NextPageWithLayout = () => {

  const {data: books} = trpc.book.all.useQuery({
    page: 1,
    limit: 10
  });

  return (
    <>
      <section className="bg-gradient-to-br from-[#0E1C26] via-[#2A454B] to-[#294861] backdrop-blur-md text-white">
        <div className="container py-14 px-20">
          <div className="max-w 2xl space-y-4">
            <h1 className="font-bold text-4xl tracking-tight"> Books</h1>
          </div>
        </div>
      </section>
      <section className="container gap-4 flex w-full flex-1 relative md:px-20 py-14">
        <div className="sticky top-20 h-full max-h-[calc(100vh-9rem)]">
          <div className="p-4 bg-white min-w-[15rem] border rounded-md ">
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {books?.data.map((book) => (
            <Link
              href={`/book/${book.id}`}
              className="group overflow-hidden w-full min-w-[14rem] max-w-[14rem] relative"
              key={book.id}
            >
              <BookCoverSkeleton
                src={book.book_cover}
                alt="book-cover"
              />
              <div
                className="text-white flex flex-col rounded-md group-hover:opacity-100 opacity-0 p-4 transition-opacity top-0 absolute w-full h-full bg-gradient-to-t from-black/90 to-black/70"
              >
                <Info className="absolute top-5 w-5 h-5"/>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Layers3 className="mr-2 w-4 h-4"/>
                      <p className="text-sm">{book.category.category_name}</p>
                    </span>
                    <span className="flex items-center">
                      <CalendarFold className="mr-2 w-4 h-4"/>
                      <p className="text-sm ">{book.release_date}</p>
                    </span>
                  </div>
                  <h1 className="text-xl font-medium max-w-[12rem] truncate">{book.book_title}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}


Page.getLayout = function getLayout(page: ReactElement){
  return <MainLayout>{page}</MainLayout>
}

export default Page;

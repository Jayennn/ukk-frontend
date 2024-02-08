import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import React, {ReactElement} from "react";
import MainLayout from "@/layouts/main/MainLayout";
import {trpc} from "@/utils/trpc";
import Image from "next/image";
import {Book} from "@/server/api/routers/book/schema";
import {BookTitleSkeleton} from "@/components/skeleton/BookTitleSkeleton";
import {Bookmark, BookOpenCheck, CalendarFold, Layers3} from "lucide-react";
import {BookCoverSkeleton} from "@/components/skeleton/BookCoverSkeleton";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useSession} from "next-auth/react";


const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const {data: session} = useSession();

  const {data: book, isLoading} = trpc.book.detail.useQuery({
    id: Number(router.query.book_id)
  })


  const ctx = trpc.useUtils();
  const addBookMutation = trpc.studentLoan.create.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)

      await ctx.studentLoan.all.refetch()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })


  const handleLoanBook = async() => {
    const book_id = Number(router.query.book_id)
    await addBookMutation.mutateAsync({
      id: Number(session?.user.id),
      data: { book_id }
    })
  }

  return (
    <>
      <section className="bg-gradient-to-br from-[#0E1C26] via-[#2A454B] to-[#294861] backdrop-blur-md text-white">
        <div className="container py-14 px-20">
          <div className="max-w-2xl space-y-4">
            <BookTitleSkeleton
              isLoading={isLoading}
              title={book?.data.book_title}
            />
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <Layers3 className="mr-2 w-4 h-4"/>
                <p className="text-sm font-medium">{book?.data.category.category_name}</p>
              </div>
              <div className="flex items-center">
                <CalendarFold className="mr-2 w-4 h-4"/>
                <p className="text-sm font-medium">Release Date {book?.data.release_date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm">
                <Bookmark className="mr-2 w-4 h-4"/>
                Bookmark
              </Button>
              <Button onClick={handleLoanBook} disabled={addBookMutation.isPending} size="sm">
                <BookOpenCheck className="mr-2 w-4 h-4"/>
                Borrow This Book
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container flex gap-4 w-full flex-1 justify-between relative py-14 md:px-20">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold">Author(s)</h3>
            <div className="flex items-center gap-5">
              {book?.data.author_books.map((author) => (
                <div key={author.author.id} className="flex border rounded-md p-2 w-full max-w-[10rem]">
                  <Image width={150} height={150} className="w-9 h-9 rounded-full object-cover mr-2 border" src={author.author.author_image ?? "/nopfp.jpg"} alt="author-image"/>
                  <span className="leading-4">
                    <p className="text-muted-foreground">{author.author.author_name}</p>
                    <p className="text-sm text-muted-foreground max-w-[6rem] truncate">{author.author.address}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-20 -mt-80 h-full max-h-[calc(100vh-9rem)]">
          <div className="bg-white shadow-md w-full min-w-[14rem] flex flex-col max-w-[14rem] rounded-md">
            <BookCoverSkeleton
              className="transition-all"
              isLoading={isLoading}
              src={book?.data.book_cover}
              alt="book-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default Page;

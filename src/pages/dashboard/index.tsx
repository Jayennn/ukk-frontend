import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import {trpc} from "@/utils/trpc";
import {BookCoverSkeleton} from "@/components/skeleton/BookCoverSkeleton";
import {BookTitleSkeleton} from "@/components/skeleton/BookTitleSkeleton";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";

const Page: NextPageWithLayout = () => {
  const {data, isLoading} = trpc.book.all.useQuery({
    page: 1,
    limit: 5
  });

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Books</h1>
          <Link href="/book" className="inline-flex items-center text-base font-medium text-muted-foreground">
            Show All
            <ArrowRight className="ml-2 w-4 h-4"/>
          </Link>
        </div>
        <Carousel>
          <CarouselContent className="flex items-center">
            {data?.data.map((book) => (
              <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-[23%]">
                <Link
                  href={`/book/${book.id}`}
                  className="bg-white shadow-md w-full flex flex-col max-w-[14rem]"
                >
                  <BookCoverSkeleton
                    className="transition-all rounded-none rounded-t-md"
                    isLoading={isLoading}
                    src={book?.book_cover}
                    alt="book-cover"
                  />
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <BookTitleSkeleton
                      className="text-lg max-w-[10rem] truncate"
                      isLoading={isLoading}
                      title={book.book_title}
                    />
                    <p className="text-sm text-muted-foreground">{book.category.category_name}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Page;

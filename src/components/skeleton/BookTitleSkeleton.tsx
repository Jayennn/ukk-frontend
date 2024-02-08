import React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

interface BookTitleSkeletonProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  isLoading?: boolean,
  title?: string
}

export const BookTitleSkeleton = (
  {isLoading, title, className, ...props}: BookTitleSkeletonProps
) => {
  return (
    <>
      {isLoading ? (
        <Skeleton
          className="h-9 max-w-[20rem]"
        />
      ) : (
        <h1
          {...props}
          className={cn(
            "font-bold text-4xl tracking-tight",
            className
          )}
        >
          {title}
        </h1>
      )}
    </>
  )
}

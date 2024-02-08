import React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import Image, { ImageProps as NextImageProps } from "next/image";
import {cn} from "@/lib/utils";

// @ts-ignore
interface BookCoverSkeletonProps extends NextImageProps {
  isLoading?: boolean;
  src?: string;
}

export const BookCoverSkeleton = (
  {isLoading, src,  className, ...props}: BookCoverSkeletonProps
) => {
  return (
    <>
      {isLoading ? (
        <Skeleton
          className="h-[18rem] w-full max-w-[14rem]"
        />
      ) : (
        <div className="overflow-hidden relative h-[18rem] w-full">
          <Image
            {...props}
            fill
            src={src || "/noimage.png"}
            alt="book-cover"
            className={cn("object-cover rounded-md", className)}
          />
        </div>
      )}
    </>
  )
}

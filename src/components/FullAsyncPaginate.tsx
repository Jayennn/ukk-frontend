import React, {ReactElement} from "react";
import {AsyncPaginate, type AsyncPaginateProps} from "react-select-async-paginate";
import {GroupBase} from "react-select";
import {Label} from "@/components/ui/label";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

export const FullAsyncPaginate =
  <OptionType, Group extends GroupBase<OptionType>, Additional, IsMulti extends boolean = false>(
    {isLoading, errMsg, label, id, wrapperClassName,...props}: AsyncPaginateProps<OptionType, Group, Additional, IsMulti> & {
      isLoading?: boolean,
      errMsg?: string,
      wrapperClassName?: string,
      label: string
    }
  ) => {
  return (
    <>
      <div className={cn("flex flex-col gap-3", wrapperClassName)}>
        {isLoading ? (
          <Skeleton className="w-full h-9"/>
        ) : (
          <>
            <Label htmlFor={id}>{label}</Label>
            <AsyncPaginate
              id={id}
              {...props}
              placeholder="Select Section Parent"
              className="react-select-container"
              classNamePrefix="react-select"
              unstyled
              defaultOptions
            />
            {errMsg && <p className="text-sm font-medium text-red-500">{errMsg}</p>}
          </>
        )}
      </div>
    </>
  )
}

import React from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

interface FullInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>{
  isLoading?: boolean,
  errMsg?: string,
  label: string,
  wrapperClassName?: string
}

export const FullInput = React.forwardRef<HTMLInputElement, FullInputProps>(
  ({isLoading, errMsg, id, label, wrapperClassName,...props}, ref) => {
  return (
    <>
      <div className={cn("flex flex-col gap-3", wrapperClassName)}>
        {isLoading ? (
          <Skeleton className="w-full h-9"/>
        ) : (
          <>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} ref={ref} {...props} />
            {errMsg && <p className="text-sm font-medium text-red-500">{errMsg}</p>}
          </>
        )}
      </div>
    </>
  )
})


FullInput.displayName = "FullInput"

import React from "react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

interface FullTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
  isLoading?: boolean,
  errMsg?: string,
  label: string,
  wrapperClassName?: string
}

export const FullTextArea = React.forwardRef<HTMLTextAreaElement, FullTextAreaProps>(
  ({isLoading, errMsg, id, label, wrapperClassName, ...props}, ref) => {
  return (
    <>
      <div className={cn("flex flex-col gap-3", wrapperClassName)}>
        {isLoading ? (
          <Skeleton className="w-full h-9"/>
        ) : (
          <>
            <Label htmlFor={id}>{label}</Label>
            <Textarea className="resize-none min-h-28" id={id} ref={ref} {...props} />
            {errMsg && <p className="text-sm font-medium text-red-500">{errMsg}</p>}
          </>
        )}
      </div>
    </>
  )
})


FullTextArea.displayName = "FullTextArea"

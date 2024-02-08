import {BellRingIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


export const DashboardNav = () => {
  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-white">
        <div className="container flex items-center justify-end py-5">
          <div className="flex items-center  gap-3">
            <div className="cursor-pointer grid h-10 w-10 place-content-center rounded-full bg-gray-100">
              <BellRingIcon className="text-[#344054] w-5 h-5"/>
            </div>
            <Avatar>
              <AvatarFallback>GA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  )
}

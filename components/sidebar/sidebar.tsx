"use client"

import { Button } from "@/components/ui/button"
import { IconSidebar } from "@/components/ui/icons"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export type SidebarProps = {
  children?: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 z-[60] size-9 p-0">
          <IconSidebar className="size-6 z-60" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="inset-y-0 z-60 flex h-auto w-[300px] flex-col p-0">{children}</SheetContent>
    </Sheet>
  )
}

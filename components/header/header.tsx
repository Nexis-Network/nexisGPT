import { auth } from "@/auth"
import ConnectBtn from '../connect-button'
import { ClearHistory } from "@/components/header/clear-history"
import { LoginButton } from "@/components/header/login-button"
import { SettingsDropDown } from "@/components/header/settings-drop-down"
import { UserMenu } from "@/components/header/user-menu"
import { Sidebar } from "@/components/sidebar/sidebar"
import { SidebarAgents } from "@/components/sidebar/sidebar-agents"
import { SidebarFooter } from "@/components/sidebar/sidebar-footer"
import { SidebarList } from "@/components/sidebar/sidebar-list"
import { Badge } from "@/components/ui/badge"
import { IconSeparator } from "@/components/ui/icons"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { clearChats, getChatList } from "@/lib/actions/db"
import { cn } from "@/lib/utils"

export const Header = async () => {
  const session = await auth()
  const user = session?.user
  const chatList = await getChatList()

  return (
<header className="sticky top-0 flex items-center justify-between py-2 max-w-7xl mx-auto px-4 rounded-full relative w-full backdrop-filter backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(34,42,53,0.06),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200">
  <div className="flex items-center">
    <Sidebar>
      <div className="flex flex-col space-y-4">
        <SheetHeader className="p-4 pt-8">
          <SheetTitle className="text-md">Agents</SheetTitle>
        </SheetHeader>
        <SidebarAgents />
      </div>
      <div className="border-t border-muted px-8 mt-4" />
      <SheetHeader className="p-4">
        <SheetTitle className="text-md">Chat History</SheetTitle>
      </SheetHeader>
      {user ? (
        <>
          <SidebarList chatList={chatList} />
          <SidebarFooter className="justify-end">
            <ClearHistory clearChats={clearChats} />
          </SidebarFooter>
        </>
      ) : null}
    </Sidebar>

    <div className="flex items-center ml-4">
      <IconSeparator className="size-6 text-muted-foreground/50" />
      {user ? (
        <UserMenu user={user} />
      ) : (
        <LoginButton variant="link" showGithubIcon={true} text="Login" className="-ml-2" />
      )}
    </div>
  </div>

  <div className="hidden md:flex items-center justify-center absolute inset-0 -z-10">
    <div className="flex items-center justify-center space-x-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={cn("text-xs text-white bg-white/20")}>NexisGPT-Turbo</Badge>
        </TooltipTrigger>
        <TooltipContent>Using the latest NexisGPT-Turbo</TooltipContent>
      </Tooltip>
    </div>
  </div>

  <div className="flex items-center justify-end space-x-4">
    <ConnectBtn />
    <SettingsDropDown />
  </div>
</header>

  )
}

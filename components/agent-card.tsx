"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { IconCheck, IconCopy, IconHome } from "@/components/ui/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { APP_URL } from "@/lib/config"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import type { Agent } from "@/lib/types"
import { cn } from "@/lib/utils"

type AgentCardProps = {
  agent: Agent
  className?: string
}

export const AgentCard = ({ agent, className }: AgentCardProps) => {
  const router = useRouter()
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const agentUrl = useMemo(() => `${APP_URL}?a=${agent.id}`, [agent.id])

  return (
    <>
      <div
        className={cn(
          "flex flex-col mx-auto z-50 text-center items-center justify-center mb-8 max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl border-gray-600/25 p-8 dark:border-gray-600/50 md:mb-12 md:border space-y-8",
          className
        )}
      >
        <Image src={agent.imageUrl} alt={`${agent.name} image`} priority={true} width={160} height={160} />
        <div className="flex flex-col items-center justify-center w-full space-y-2">
          <p className="text-md font-bold tracking-tight lg:text-2xl lg:font-normal">Agent: {agent.name}</p>
          <p className="text-md font-normal tracking-tight lg:text-lg lg:font-normal">{agent.description}</p>
          <p className="text-sm font-normal tracking-tight lg:text-md lg:font-normal">created by {agent.creator} </p>

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={() => {
                  router.push("/")
                }}
                className={cn(
                  buttonVariants({ size: "sm", variant: "secondary" }),
                  "absolute left-0 top-4 size-8 rounded-full border  sm:left-4"
                )}
              >
                <IconHome />
                <span className="sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="icon" onClick={() => copyToClipboard(agentUrl)}>
            {isCopied ? <IconCheck /> : <IconCopy />}
            <span className="sr-only">Copy message</span>
          </Button>
        </div>
      </div>
    </>
  )
}

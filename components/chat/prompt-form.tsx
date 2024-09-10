"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import type { UseAssistantHelpers } from "@ai-sdk/react"
import Textarea from "react-textarea-autosize"

import { Button, buttonVariants } from "@/components/ui/button"
import { IconHome } from "@/components/ui/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit"
import { cn } from "@/lib/utils"

type PromptProps = Pick<UseAssistantHelpers, "append" | "status">

export const PromptForm = ({ append, status }: PromptProps) => {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const [input, setInput] = useState<string>("")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault()

        if (status === "in_progress") {
          return
        }

        const value = input.trim()
        if (!value) {
          return
        }

        setInput("")
        await append({ role: "user", content: value })
      }}
      className="h-full w-full flex items-center justify-center"
    >
      <div className="relative flex w-full grow items-center h-[45px] bg-[#121212] rounded-full border border-[#27272A] px-4 sm:border sm:px-12">
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={() => {
                router.push("/")
              }}
              className={cn(
                buttonVariants({ size: "sm", variant: "secondary" }),
                "rounded-full p-0 bg-[#121212]"
              )}
            >
              <IconHome />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>

        {/* Textarea modified for the 45px height constraint */}
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          autoFocus
          value={input}
          onChange={(e) => {
            e.preventDefault()
            setInput(e.target.value)
          }}
          placeholder="send a message"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          className="flex-1 h-full bg-transparent resize-none px-4 text-white focus:outline-none sm:text-sm"
        />

        <div className="ml-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === "" || status === "in_progress"}>
                <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.232887 13.7896C-0.0639996 13.4958 -0.079031 13.0036 0.199287 12.6903L5.25313 6.99999L0.199287 1.30976C-0.079031 0.996314 -0.0639996 0.504135 0.232887 0.21029C0.529774 -0.083399 0.996074 -0.0675316 1.27439 0.245758L6.80072 6.46804C7.06643 6.76722 7.06643 7.23276 6.80072 7.53194L1.27439 13.7542C0.996074 14.0676 0.529774 14.0834 0.232887 13.7896Z" fill="#FAFAFA"/>
                </svg>
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}

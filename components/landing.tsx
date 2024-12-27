"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import Player from "react-lottie-player"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getUserField, storeEmail } from "@/lib/actions/db"
import { useIsClient } from "@/lib/hooks/use-is-client"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { isValidEmail } from "@/lib/utils"
import nexisGPTLogo from "@/public/nexisgpt-logo-beta.svg"

type LandingProps = {
  userId?: string
  disableAnimations?: boolean
}

export function Landing({ userId, disableAnimations }: LandingProps) {
  const [validationError, setValidationError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>("")
  const [localIsSubscribed, setLocalIsSubscribed] = useLocalStorage("email_subscribed", false)
  const isClient = useIsClient()

  useEffect(() => {
    const fetchIsEmailSubscribed = async () => {
      const backendIsSubscribed = await getUserField("email_subscribed")
      if (backendIsSubscribed === true) {
        setLocalIsSubscribed(true)
      }
    }

    if (localIsSubscribed !== true && userId && isClient) {
      fetchIsEmailSubscribed()
    }
  }, [localIsSubscribed, setLocalIsSubscribed, userId, isClient])

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setValidationError("Please enter a valid email")
      return
    }
    setValidationError(null)
    await storeEmail(email)
    setLocalIsSubscribed(true)
    setEmail("")
    toast.success("Thanks for subscribing!")
  }

  return (
    <>

      <hr className="mb-4 md:hidden" />

      {isClient && localIsSubscribed === false ? (
        <div className="mx-auto mb-16 max-w-2xltext-center ">
          
        </div>
      ) : null}
    </>
  )
}

'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import dbConnect from "@/lib/dbConnect"

export default function Component() {
  useEffect(() => {
     dbConnect();
  })
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="bg-slate-800 px-3 py-1 rounded-lg" onClick={() => signIn()}>Sign in</button>
    </>
  )
}
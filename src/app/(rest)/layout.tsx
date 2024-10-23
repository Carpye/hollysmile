import Navbar from "@/components/Navbar"
import React, { ReactNode } from "react"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar type="regular" />
      {children}
    </>
  )
}

export default layout

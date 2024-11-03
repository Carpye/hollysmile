import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen">
      <Navbar type="regular" />
      <div className="flex h-[calc(100%-128px)] flex-col items-center justify-center gap-8">
        <h1 className="text-[6rem]">404</h1>
        <p className="text-xl">
          Przykro nam, strona której szukasz nie została odnaleziona.
        </p>
        <Button
          variant="expandIcon"
          Icon={ArrowLeftIcon}
          iconPlacement="left"
          className=""
          asChild
        >
          <Link href={"/"}>Wroć do sklepu</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage

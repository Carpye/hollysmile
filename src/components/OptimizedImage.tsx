import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  // Using 16:9 as default aspect ratio
  width?: number
  height?: number
  fill?: boolean
}

const OptimizedImage = ({
  src,
  alt,
  className = "",
  priority = false,
  width = 1200,
  height = 675,
  fill = false,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const props = fill ? { layout: "fill" } : { width, height }

  return (
    <div className="relative h-full w-full">
      {/* Blur placeholder */}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse bg-gray-200",
            fill ? "h-full w-full" : `aspect-[${width}/${height}]`
          )}
          // style={{ aspectRatio: `${width}/${height}` }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        {...props}
        // layout={fill ? "fill" : "responsive"}
        priority={priority}
        quality={90} // Good balance between quality and file size
        className={`h-auto w-full transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className} `}
        onLoad={() => {
          console.log("Image loaded")
          setIsLoading(false)
        }}
        // Enable blur-up placeholder if the image is hosted on your domain
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEA2P/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIAA0AFgMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAABQYHBP/EACsQAAEDAwIEBAcAAAAAAAAAAAECAwQABREGEgchMUETIlGRFBUjMmFxgf/EABcBAQEBAQAAAAAAAAAAAAAAAAQFAwL/xAAeEQACAgICAwEAAAAAAAAAAAABAgADBBESIQUxQRP/2gAMAwEAAhEDEQA/AOe2+NFuEspclxo7zw5pQsAgj2NMrjw8vMBlTrcVuWgdSlWD/DUxabPO1DeGLVb2/EeWCSScJSkdVKPYVcrZb4llhR4cFkssMp2gE5PuetU8t3Ukh+jMwrtapSpugY1ktyW0R3lR33WVrb+4IUQcfypaxX+dcr3EhvyVKZfcSlZ2gcj1FFFaPIKi1iv1IuCzLUzN6npuZGhwkyIqm3YLSmtqzzAAJGPeoOz2h+/XVm3QyhTzpOCtWEgAZJJ9KKKVh0rW25vZlZdjPaTWNafB//Z"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

export default OptimizedImage

"use client"
import { cn } from "@/lib/utils"
import {
  motion,
  SpringOptions,
  useInView,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef } from "react"

type AnimatedNumber = {
  value: number
  className?: string
  springOptions?: SpringOptions
}

export function AnimatedNumber({
  value,
  className,
  springOptions,
}: AnimatedNumber) {
  const spring = useSpring(value, springOptions)
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  )
  const ref = useRef(null)
  const isInView = useInView(ref)
  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, value, isInView])

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  )
}

"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { MouseEventHandler, useState } from "react"
import { TextShimmer } from "../motion/TextShimmer"

import { Domine } from "next/font/google"
import { cn } from "@/lib/utils"

const domine = Domine({
  subsets: ["latin"],
  display: "swap",
})

const AboutUs = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div
      className="relative mx-auto w-full max-w-screen-2xl px-4 py-8 lg:px-16 xl:px-24"
      id="about-us"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-7"
      >
        {/* Header section */}
        <div className="lg:col-span-3">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-base text-secondary drop-shadow-md"
          >
            Poznaj nas
          </motion.h3>
          <TextShimmer
            className="p-2 text-4xl font-semibold drop-shadow-md [--base-color:theme(colors.primary.DEFAULT)] [--base-gradient-color:#554338] sm:text-5xl lg:text-6xl xl:text-7xl"
            duration={2}
            spread={6}
          >
            Kto za tym stoi?
          </TextShimmer>
        </div>

        {/* First Person */}
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <AnimatedPerson
            name="Jane Doe"
            role="Dyrektor Generalny (CEO)"
            image="/assets/Jane.png"
            description={
              '"Jestem stomatologiem z ponad 10-letnim doświadczeniem i zawsze chciałam, aby zdrowa pielęgnacja jamy ustnej była dostępna dla każdego. Holly Smile to moja odpowiedź na potrzebę połączenia nowoczesnych technologii z ekologią."'
            }
          />
        </motion.div>

        {/* Second Person */}
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <AnimatedPerson
            name="John Doe"
            role="Dyrektor ds. Produktu (Chief Product Officer)"
            image="/assets/Joe.png"
            description={
              '"Zawsze interesowałem się nowymi technologiami i budowaniem marek, które mają realny wpływ na życie ludzi. Kiedy razem z żoną zaczęliśmy pracować nad Holly Smile, naszym celem było stworzenie czegoś więcej niż tylko kolejnych produktów do higieny jamy ustnej."'
            }
          />
        </motion.div>

        {/* Image section */}
        <motion.div
          variants={imageVariants}
          className="relative h-64 min-h-[300px] lg:col-span-3 lg:h-full"
        >
          <Image
            src="/assets/bg1.webp"
            fill
            alt=""
            className="rounded-2xl object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

const cardVariants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut",
    },
  },
}

const AnimatedPerson = ({
  name,
  description,
  image,
  role,
}: {
  name: string
  description: string
  image: string
  role: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      animate="visible"
      className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-[#7C6354] p-4 sm:p-6"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base content layer */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:gap-6">
        <motion.div
          variants={imageVariants}
          className="relative mb-4 aspect-square w-full sm:mb-0 sm:h-56 sm:w-56 sm:min-w-[224px]"
        >
          <Image src={image} fill alt="" className="rounded-2xl object-cover" />
        </motion.div>
        <motion.div variants={textVariants} className="flex flex-col">
          {/* Single text layer */}
          <div className="relative">
            <h1 className="text-2xl font-semibold text-[#E3E9C2] sm:text-3xl lg:text-4xl">
              {name}
            </h1>
            <h3 className="text-sm text-[#A5ABAF] sm:text-base">{role}</h3>
            <p
              className={cn(
                "mt-2 text-sm text-[#F8FCDA] sm:text-base lg:text-lg",
                domine.className
              )}
            >
              {description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Circle layer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-30 h-64 w-64 rounded-full bg-[#F9FBB2] mix-blend-difference"
            animate={{
              x: mousePosition.x - 256 / 2,
              y: mousePosition.y - 256 / 2,
              opacity: 1,
              scale: 1,
            }}
            initial={{
              x: mousePosition.x - 256 / 2,
              y: mousePosition.y - 256 / 2,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              x: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              },
              y: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              duration: 0,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default AboutUs

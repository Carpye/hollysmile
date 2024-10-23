import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="w-full px-4 py-8 md:px-12 lg:px-16 xl:px-24" id="about-us">
      {/* Container with relative positioning for overlapping cards */}
      <div className="relative min-h-[800px]">
        {/* Header section - positioned absolutely on larger screens */}
        <div className="mb-8 lg:absolute lg:left-0 lg:top-0 lg:mb-0">
          <h3 className="text-base text-secondary drop-shadow-md">
            Poznaj nas
          </h3>
          <h1 className="text-4xl font-semibold text-primary drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Kto za
            <br /> tym stoi?
          </h1>
        </div>

        {/* Cards container with diagonal layout on larger screens */}
        <div className="relative mt-16 flex flex-col gap-8 lg:mt-0">
          {/* First person card - positioned top right */}
          <div className="lg:absolute lg:right-0 lg:top-32 lg:w-[600px]">
            <Person
              name="Jane Doe"
              role="Dyrektor Generalny (CEO)"
              image="/assets/Jane.png"
              description={
                '„Jestem stomatologiem z ponad 10-letnim doświadczeniem i zawsze chciałam, aby zdrowa pielęgnacja jamy ustnej była dostępna dla każdego. Holly Smile to moja odpowiedź na potrzebę połączenia nowoczesnych technologii z ekologią. "'
              }
            />
          </div>

          {/* Second person card - positioned middle left */}
          <div className="lg:absolute lg:left-0 lg:top-[400px] lg:w-[600px]">
            <Person
              name="John Doe"
              role="Dyrektor ds. Produktu (Chief Product Officer)"
              image="/assets/Joe.png"
              description={
                '„Zawsze interesowałem się nowymi technologiami i budowaniem marek, które mają realny wpływ na życie ludzi. Kiedy razem z żoną zaczęliśmy pracować nad Holly Smile, naszym celem było stworzenie czegoś więcej niż tylko kolejnych produktów do higieny jamy ustnej."'
              }
            />
          </div>

          {/* Background image - positioned bottom right */}
          <div className="relative h-60 lg:absolute lg:bottom-0 lg:right-0 lg:h-80 lg:w-[500px]">
            <Image
              src={"/assets/bg1.png"}
              fill
              alt=""
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Person({
  name,
  description,
  image,
  role,
}: {
  name: string
  description: string
  image: string
  role: string
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-[#9D8189] p-4 sm:flex-row lg:gap-6 lg:p-6">
      <div className="relative h-48 w-full sm:h-56 sm:w-56 sm:min-w-56">
        <Image src={image} fill alt="" className="rounded-2xl object-cover" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold text-background sm:text-4xl">
          {name}
        </h1>
        <h3 className="text-sm text-background/60 sm:text-base">{role}</h3>
        <p className="mt-2 text-base text-white sm:text-lg">{description}</p>
      </div>
    </div>
  )
}

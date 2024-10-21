import Image from "next/image"

export default function AboutUs() {
  return (
    <div
      className="w-full bg-[url('/assets/bgAboutUs.svg')] px-2 py-16 pb-32 md:px-8 lg:px-24"
      id="about-us"
    >
      <div className="grid gap-8 md:grid-cols-5 md:grid-rows-2">
        <div className="flex flex-col justify-center md:col-span-2">
          <h3 className="text-center text-base text-secondary drop-shadow-md md:text-left">
            Poznaj nas
          </h3>
          <h1 className="text-center text-5xl font-semibold text-primary drop-shadow-lg md:text-left md:text-7xl lg:text-8xl">
            Kto za
            <br /> tym stoi?
          </h1>
        </div>
        <div className="order-1 h-full md:order-none md:col-span-3">
          <Person
            name="Jane Doe"
            role="Dyrektor Generalny (CEO)"
            image="/assets/Jane.png"
            description="„Jestem stomatologiem z ponad 10-letnim doświadczeniem i zawsze chciałam, aby zdrowa pielęgnacja jamy ustnej była dostępna dla każdego. Holly Smile to moja odpowiedź na potrzebę połączenia nowoczesnych technologii z ekologią. “"
          />
        </div>
        <div className="order-3 h-full md:order-none md:col-span-3">
          <Person
            name="John Doe"
            role="Dyrektor ds. Produktu (Chief Product Officer)"
            image="/assets/Joe.png"
            description="„Jestem stomatologiem z ponad 10-letnim doświadczeniem i zawsze chciałam, aby zdrowa pielęgnacja jamy ustnej była dostępna dla każdego. Holly Smile to moja odpowiedź na potrzebę połączenia nowoczesnych technologii z ekologią. “"
          />
        </div>

        <div className="relative order-2 h-64 drop-shadow-xl md:order-none md:col-span-2 md:h-full">
          <Image
            src={"/assets/bg1.png"}
            fill
            alt=""
            className="rounded-2xl object-cover shadow-xl"
          />
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
    <div className="flex h-full flex-col gap-4 rounded-3xl bg-[#9D8189] p-4 drop-shadow-xl md:flex-row">
      <div className="relative h-64 w-full min-w-56 md:h-full md:w-56">
        <Image src={image} fill alt="" className="rounded-2xl object-cover" />
      </div>
      <div className="h-full">
        <h1 className="text-4xl font-semibold text-background">{name}</h1>
        <h3 className="text-base text-background/60">{role}</h3>
        <p className="mt-2 text-sm text-white lg:text-lg">{description}</p>
      </div>
    </div>
  )
}

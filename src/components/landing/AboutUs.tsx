import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="w-full px-24 py-16 pb-32" id="about-us">
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="text-base text-secondary drop-shadow-md">
            Poznaj nas
          </h3>
          <h1 className="text-8xl font-semibold text-primary drop-shadow-lg">
            Kto za
            <br /> tym stoi?
          </h1>
        </div>
        <Person
          name="Jane Doe"
          role="Dyrektor Generalny (CEO)"
          image="/assets/Jane.png"
          description="„Jestem stomatologiem z ponad 10-letnim doświadczeniem i zawsze chciałam, aby zdrowa pielęgnacja jamy ustnej była dostępna dla każdego. Holly Smile to moja odpowiedź na potrzebę połączenia nowoczesnych technologii z ekologią. “"
        />
        <Person
          name="John Doe"
          role="Dyrektor ds. Produktu (Chief Product Officer)"
          image="/assets/Joe.png"
          description="„Jestem stomatologiem z ponad 10-letnim doświadczeniem i zawsze chciałam, aby zdrowa pielęgnacja jamy ustnej była dostępna dla każdego. Holly Smile to moja odpowiedź na potrzebę połączenia nowoczesnych technologii z ekologią. “"
        />
        <div className="relative col-span-2 h-80">
          <Image
            src={"/assets/bg1.png"}
            fill
            alt=""
            className="rounded-2xl object-cover"
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
    <div className="col-span-3 flex gap-4 rounded-3xl bg-[#9D8189] p-4">
      <div className="relative h-full w-56 min-w-56">
        <Image src={image} fill alt="" className="rounded-2xl object-cover" />
      </div>
      <div className="h-full">
        <h1 className="text-4xl font-semibold text-background">{name}</h1>
        <h3 className="text-base text-background/60">{role}</h3>
        <p className="mt-2 text-lg text-white">{description}</p>
      </div>
    </div>
  )
}

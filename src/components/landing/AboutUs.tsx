import Image from "next/image"

export default function AboutUs() {
  return (
    <div
      className="w-full bg-[url('/assets/grid-background.png')] py-16"
      id="about-us"
    >
      <h6 className="text-center text-primary">O nas</h6>
      <h1 className="px-2 text-center font-Junge text-3xl font-medium md:text-5xl">
        Poznaj nas lepiej
      </h1>
      <div className="flex flex-col items-center justify-center gap-8 pt-16 lg:flex-row">
        <Person
          description=" Test Test to niezwykle utalentowana i zaangażowana pracownica,
            której profesjonalizm i pozytywne podejście wyróżniają ją w każdej
            roli."
          image="/men.svg"
          name="Test Test"
        />
        <Person
          description=" Test Test to niezwykle utalentowana i zaangażowana pracownica,
            której profesjonalizm i pozytywne podejście wyróżniają ją w każdej
            roli."
          image="/men.svg"
          name="Test Test"
        />
      </div>
    </div>
  )
}

function Person({
  name,
  description,
  image,
}: {
  name: string
  description: string
  image: string
}) {
  return (
    <div className="flex flex-col items-center last:pb-16 lg:pb-16">
      <div className="relative aspect-square w-48 md:w-64 xl:w-96">
        <Image src={image} alt={name} fill />
        <div className="text-md absolute bottom-3 left-1/2 -translate-x-1/2 transform text-nowrap rounded-2xl bg-primary p-1 px-6 text-center font-semibold text-white shadow-xl md:text-lg lg:text-xl xl:text-3xl">
          {name}
        </div>
      </div>
      <p className="max-w-md px-8 text-center text-sm font-medium md:text-base">
        {description}
      </p>
    </div>
  )
}

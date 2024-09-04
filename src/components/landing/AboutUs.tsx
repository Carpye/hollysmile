import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="h-screen w-full py-16">
      <h6 className="text-center text-primary">O nas</h6>
      <h1 className="px-2 text-center font-Junge text-5xl font-medium">
        Poznaj nas lepiej
      </h1>
      <div className="flex justify-center gap-8 pt-16">
        <div className="relative h-96 w-96">
          <Image src={"/men.svg"} alt="xD" fill />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform text-nowrap rounded-2xl bg-primary p-2 px-12 text-center text-xl font-semibold text-white shadow-xl">
            Test Test
          </div>
          <p className="absolute -bottom-32 left-1/2 w-2/3 -translate-x-1/2 transform text-center">
            Test Test to niezwykle utalentowana i zaangażowana pracownica,
            której profesjonalizm i pozytywne podejście wyróżniają ją w każdej
            roli.{" "}
          </p>
        </div>
        <div className="relative h-96 w-96">
          <Image src={"/men.svg"} alt="xD" fill />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform text-nowrap rounded-2xl bg-primary p-2 px-12 text-center text-xl font-semibold text-white shadow-xl">
            Test Test
          </div>
          <p className="absolute -bottom-32 left-1/2 w-2/3 -translate-x-1/2 transform text-center">
            Test Test to niezwykle utalentowana i zaangażowana pracownica,
            której profesjonalizm i pozytywne podejście wyróżniają ją w każdej
            roli.{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

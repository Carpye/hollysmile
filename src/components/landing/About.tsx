import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CircleCheckBig, Icon, Shield, Stars } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-br from-indigo-300 to-primary py-16">
      <h1 className="px-2 text-center text-5xl font-semibold text-white drop-shadow-lg md:text-6xl">
        Dlaczego szczoteczki Holly Smile?
      </h1>
      <p className="px-4 py-4 text-center text-lg text-neutral-100 drop-shadow-md">
        Innowacyjna technologia dla Twojego uśmiechu. Odkryj nowy wymiar higieny
        jamy ustnej.
      </p>
      <div className="flex w-full flex-wrap justify-center gap-8 px-4 py-12">
        <InfoCard
          title="Skuteczne czyszczenie"
          description="Zaawansowana technologia szczoteczek HollySmile zapewnia dokładne i
          delikatne czyszczenie."
          icon={<CircleCheckBig className="h-10 w-10 text-primary" />}
        />
        <InfoCard
          title="Białszy Uśmiech"
          description="Specjalna formuła włókien pomaga w naturalnym wybielaniu zębów, przywracając blask Twojemu uśmiechowi."
          icon={<Stars className="h-10 w-10 text-primary" />}
        />
        <InfoCard
          title="Ochrona Dziąseł"
          description="Miękkie włosie i ergonomiczny kształt chronią Twoje dziąsła przed podrażnieniami."
          icon={<Shield className="h-10 w-10 text-primary" />}
        />
      </div>
      <Button
        size={"lg"}
        variant={"secondary"}
        className="rounded-xl text-lg text-primary shadow-lg transition-all hover:scale-110"
        asChild
      >
        <Link href="/produkty">Zamów już teraz!</Link>
      </Button>
      <div className="relative flex w-full flex-wrap justify-center gap-12 pt-12 md:-left-2 lg:gap-48">
        <InfoStat value={"95%"} title="Zadowolonych klientów" />
        <InfoStat value={"1000%"} title="Białych uśmiechów dziennie" />
        <InfoStat value={"50%"} title="Mniej płytki nazębnej" />
      </div>
    </div>
  )
}
//Białych uśmiechów
function InfoCard({
  title,
  description,
  icon,
  className,
}: {
  title: string
  description: string
  icon: any
  className?: string
}) {
  return (
    <Card className="w-96 border-2 border-neutral-200 bg-gradient-to-br from-white to-indigo-100 py-4">
      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 flex justify-center">{icon}</div>
        <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
        <p className="w-5/6 text-lg text-neutral-700">{description}</p>
      </CardContent>
    </Card>
  )
}

function InfoStat({ value, title }: { value: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white drop-shadow-lg">
      <span className="text-4xl font-bold">{value}</span>
      <p className="text-center text-lg font-medium">{title}</p>
    </div>
  )
}
